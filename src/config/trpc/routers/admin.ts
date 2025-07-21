import { z } from 'zod';
import { router, adminProcedure } from '../init';
import { db } from '@/config/db';
import { partners, dispatchData, dieselData, supportQueries } from '@/config/db/schema';
import { and, eq, count, desc } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { TRPCError } from '@trpc/server';

// Generate partner ID format: initials + 4 digits
function generatePartnerId(name: string): string {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);

  const digits = Math.floor(1000 + Math.random() * 9000);
  return `${initials}${digits}`;
}

// Generate secure password
function generatePassword(): string {
  return nanoid(12);
}

// Validation schemas
const dispatchRecordSchema = z.object({
  id: z.string().optional(),
  date: z.string(),
  vehicleNumber: z.string(),
  material: z.string(),
  quantity: z.string(),
  destination: z.string(),
  ownerName: z.string(),
  partnerId: z.string(),
});

const dieselRecordSchema = z.object({
  id: z.string().optional(),
  date: z.string(),
  vehicleNumber: z.string(),
  volume: z.string(),
  item: z.string(),
  fuelStation: z.string(),
  status: z.string(),
  partnerId: z.string(),
});

export const adminRouter = router({
  // Get all partners
  getPartners: adminProcedure.query(async () => {
    const partnersData = await db.query.partners.findMany({
      orderBy: [partners.createdAt],
    });

    return partnersData.map((partner) => ({
      id: partner.id,
      name: partner.name,
      partnerId: partner.partnerId,
      createdAt: partner.createdAt,
      lastLogin: partner.lastLogin,
    }));
  }),

  // Create new partner with enhanced validation
  createPartner: adminProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(1, 'Partner name is required')
          .min(2, 'Partner name must be at least 2 characters')
          .max(100, 'Partner name must be less than 100 characters')
          .transform((val) => val.trim().replace(/\s+/g, ' ')), // Normalize whitespace
        ownerName: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { name } = input;

      // Generate unique partner ID
      let partnerId = generatePartnerId(name);
      let attempts = 0;

      // Ensure uniqueness
      while (attempts < 10) {
        const existing = await db.query.partners.findFirst({
          where: eq(partners.partnerId, partnerId),
        });

        if (!existing) break;

        partnerId = generatePartnerId(name);
        attempts++;
      }

      if (attempts >= 10) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to generate unique partner ID',
        });
      }

      // Generate password and hash it
      const password = generatePassword();
      const hashedPassword = await bcrypt.hash(password, 12);

      // Insert partner
      const [newPartner] = await db
        .insert(partners)
        .values({
          name,
          partnerId,
          password: hashedPassword,
        })
        .returning();

      return {
        id: newPartner.id,
        name: newPartner.name,
        partnerId: newPartner.partnerId,
        password, // Return plain password for admin to share
        createdAt: newPartner.createdAt,
      };
    }),

  // Reset partner password with validation
  resetPartnerPassword: adminProcedure
    .input(
      z.object({
        partnerId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const partner = await db.query.partners.findFirst({
        where: eq(partners.id, input.partnerId),
      });

      if (!partner) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Partner not found',
        });
      }

      const newPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      await db
        .update(partners)
        .set({ password: hashedPassword })
        .where(eq(partners.id, input.partnerId));

      return {
        partnerId: partner.partnerId,
        name: partner.name,
        newPassword,
      };
    }),

  // Delete partner with validation
  deletePartner: adminProcedure
    .input(
      z.object({
        partnerId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      // Check if partner has associated data
      const dispatchCount = await db
        .select({ count: count() })
        .from(dispatchData)
        .where(eq(dispatchData.partnerId, input.partnerId));

      const dieselCount = await db
        .select({ count: count() })
        .from(dieselData)
        .where(eq(dieselData.partnerId, input.partnerId));

      const hasData =
        Number(dispatchCount[0]?.count || 0) > 0 ||
        Number(dieselCount[0]?.count || 0) > 0;

      if (hasData) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Cannot delete partner with existing data records',
        });
      }

      await db.delete(partners).where(eq(partners.id, input.partnerId));

      return { success: true };
    }),

  // Get partner statistics
  getPartnerStats: adminProcedure.query(async () => {
    const [{ value: totalPartners }] = await db
      .select({ value: count() })
      .from(partners);

    const [{ value: totalDispatchRecords }] = await db
      .select({ value: count() })
      .from(dispatchData);

    const [{ value: totalDieselRecords }] = await db
      .select({ value: count() })
      .from(dieselData);

    return {
      totalPartners,
      totalDispatchRecords,
      totalDieselRecords,
    };
  }),

  // Get partner credentials for export
  getPartnerCredentials: adminProcedure.query(async () => {
    // Note: This doesn't return actual passwords for security
    // In a real implementation, you'd need to track passwords separately
    // or generate them on-demand
    const partnersData = await db.query.partners.findMany({
      orderBy: [partners.createdAt],
    });

    return partnersData.map((partner) => ({
      id: partner.id,
      name: partner.name,
      partnerId: partner.partnerId,
      createdAt: partner.createdAt,
      // Note: Password would need to be handled differently in production
      password: '[Protected]',
    }));
  }),

  // Add new dispatch record
  addDispatchRecord: adminProcedure
    .input(dispatchRecordSchema.omit({ id: true }))
    .mutation(async ({ input }) => {
      // Check for duplicate
      const existing = await db.query.dispatchData.findFirst({
        where: and(
          eq(dispatchData.date, input.date),
          eq(dispatchData.vehicleNumber, input.vehicleNumber.toUpperCase()),
          eq(dispatchData.material, input.material),
          eq(dispatchData.quantity, input.quantity),
          eq(dispatchData.destination, input.destination),
          eq(dispatchData.ownerName, input.ownerName)
        ),
      });

      if (existing) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'This dispatch record already exists',
        });
      }

      const [record] = await db
        .insert(dispatchData)
        .values({
          ...input,
          vehicleNumber: input.vehicleNumber.toUpperCase(),
        })
        .returning();

      return { success: true, record };
    }),

  // Edit dispatch record
  editDispatchRecord: adminProcedure
    .input(dispatchRecordSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      if (!id) throw new TRPCError({ 
        code: 'BAD_REQUEST',
        message: 'Record ID is required for editing'
      });

      // Check for duplicate (excluding current record)
      const duplicate = await db.query.dispatchData.findFirst({
        where: and(
          eq(dispatchData.date, data.date),
          eq(dispatchData.vehicleNumber, data.vehicleNumber.toUpperCase()),
          eq(dispatchData.material, data.material),
          eq(dispatchData.quantity, data.quantity),
          eq(dispatchData.destination, data.destination),
          eq(dispatchData.ownerName, data.ownerName)
        ),
      });

      if (duplicate && duplicate.id !== id) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'This would create a duplicate record',
        });
      }

      await db
        .update(dispatchData)
        .set({
          ...data,
          vehicleNumber: data.vehicleNumber.toUpperCase(),
        })
        .where(eq(dispatchData.id, id));

      return { success: true };
    }),

  // Delete dispatch record
  deleteDispatchRecord: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db
        .delete(dispatchData)
        .where(eq(dispatchData.id, input.id));

      return { success: true };
    }),

  // Add new diesel record
  addDieselRecord: adminProcedure
    .input(dieselRecordSchema.omit({ id: true }))
    .mutation(async ({ input }) => {
      // Check for duplicate
      const existing = await db.query.dieselData.findFirst({
        where: and(
          eq(dieselData.date, input.date),
          eq(dieselData.vehicleNumber, input.vehicleNumber.toUpperCase()),
          eq(dieselData.volume, input.volume),
          eq(dieselData.item, input.item),
          eq(dieselData.fuelStation, input.fuelStation),
          eq(dieselData.status, input.status)
        ),
      });

      if (existing) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'This diesel record already exists',
        });
      }

      const [record] = await db
        .insert(dieselData)
        .values({
          ...input,
          vehicleNumber: input.vehicleNumber.toUpperCase(),
        })
        .returning();

      return { success: true, record };
    }),

  // Edit diesel record
  editDieselRecord: adminProcedure
    .input(dieselRecordSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      if (!id) throw new TRPCError({ 
        code: 'BAD_REQUEST',
        message: 'Record ID is required for editing'
      });

      // Check for duplicate (excluding current record)
      const duplicate = await db.query.dieselData.findFirst({
        where: and(
          eq(dieselData.date, data.date),
          eq(dieselData.vehicleNumber, data.vehicleNumber.toUpperCase()),
          eq(dieselData.volume, data.volume),
          eq(dieselData.item, data.item),
          eq(dieselData.fuelStation, data.fuelStation),
          eq(dieselData.status, data.status)
        ),
      });

      if (duplicate && duplicate.id !== id) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'This would create a duplicate record',
        });
      }

      await db
        .update(dieselData)
        .set({
          ...data,
          vehicleNumber: data.vehicleNumber.toUpperCase(),
        })
        .where(eq(dieselData.id, id));

      return { success: true };
    }),

  // Delete diesel record
  deleteDieselRecord: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db
        .delete(dieselData)
        .where(eq(dieselData.id, input.id));

      return { success: true };
    }),

  // Get all dispatch records
  getAllDispatchRecords: adminProcedure
    .query(async () => {
      return await db.query.dispatchData.findMany({
        orderBy: (dispatchData, { desc }) => [desc(dispatchData.date)],
      });
    }),

  // Get all diesel records
  getAllDieselRecords: adminProcedure
    .query(async () => {
      return await db.query.dieselData.findMany({
        orderBy: (dieselData, { desc }) => [desc(dieselData.date)],
      });
  }),

  // Get all support queries
  getSupportQueries: adminProcedure.query(async () => {
    const queries = await db.query.supportQueries.findMany({
      orderBy: [desc(supportQueries.createdAt)],
      with: {
        partner: true,
      },
    });

    return queries;
  }),

  // Update support query status
  updateSupportQuery: adminProcedure
    .input(
      z.object({
        queryId: z.string(),
        status: z.enum(['pending', 'in_progress', 'resolved']),
        response: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { queryId, status, response } = input;

      const [updatedQuery] = await db
        .update(supportQueries)
        .set({
          status,
          response,
          ...(status === 'resolved' ? { resolvedAt: new Date() } : {}),
          updatedAt: new Date(),
        })
        .where(eq(supportQueries.id, queryId))
        .returning();

      return updatedQuery;
    }),

  // Clear all data
  clearAllData: adminProcedure.mutation(async () => {
    try {
      // Delete all diesel records
      await db.delete(dieselData);
      
      // Delete all dispatch records
      await db.delete(dispatchData);
      
      // Delete all partners
      await db.delete(partners);

      return {
        success: true,
        message: 'All data has been cleared successfully',
      };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to clear data',
        cause: error,
      });
    }
  }),
});
