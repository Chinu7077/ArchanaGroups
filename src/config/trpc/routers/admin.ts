import { z } from 'zod';
import { router, adminProcedure } from '../init';
import { db } from '@/config/db';
import {
  partners,
  dispatchData,
  dieselData,
  insertPartnerSchema,
  type Partner,
} from '@/config/db/schema';
import { eq, sql, desc } from 'drizzle-orm';
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

export const adminRouter = router({
  // Get all partners
  getPartners: adminProcedure.query(async () => {
    const partnersData = await db.query.partners.findMany({
      orderBy: [desc(partners.createdAt)],
    });

    return partnersData.map((partner: Partner) => ({
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
        .select({ count: sql<number>`COUNT(*)` })
        .from(dispatchData)
        .where(eq(dispatchData.partnerId, input.partnerId));

      const dieselCount = await db
        .select({ count: sql<number>`COUNT(*)` })
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
    const totalPartners = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(partners);

    const totalDispatchRecords = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(dispatchData);

    const totalDieselRecords = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(dieselData);

    return {
      totalPartners: Number(totalPartners[0]?.count || 0),
      totalDispatchRecords: Number(totalDispatchRecords[0]?.count || 0),
      totalDieselRecords: Number(totalDieselRecords[0]?.count || 0),
    };
  }),

  // Get partner credentials for export
  getPartnerCredentials: adminProcedure.query(async () => {
    // Note: This doesn't return actual passwords for security
    // In a real implementation, you'd need to track passwords separately
    // or generate them on-demand
    const partnersData = await db.query.partners.findMany({
      orderBy: [desc(partners.createdAt)],
    });

    return partnersData.map((partner: Partner) => ({
      id: partner.id,
      name: partner.name,
      partnerId: partner.partnerId,
      createdAt: partner.createdAt,
      // Note: Password would need to be handled differently in production
      password: '[Protected]',
    }));
  }),
});
