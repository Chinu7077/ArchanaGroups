import { z } from 'zod';
import { router, partnerProcedure, protectedProcedure } from '../init';
import { db, dispatchData, dieselData, dataFilterSchema } from '@/config/db';
import { supportQueries, supportQuerySchema } from '@/config/db/schema';
import { and, eq, gte, lte, sql } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { desc } from 'drizzle-orm';

export const dataRouter = router({
  // Get dispatch data for partner with filtering
  getDispatchData: partnerProcedure
    .input(dataFilterSchema)
    .query(async ({ ctx, input }) => {
      const { month, year, dateRange } = input;

      // Build date filters
      const startDate = new Date(year, month - 1, 1);
      let endDate = new Date(year, month, 0); // Last day of month

      // Adjust date range if specified
      if (dateRange === '1-15') {
        endDate = new Date(year, month - 1, 15);
      } else if (dateRange === '16-31') {
        startDate.setDate(16);
      }

      const data = await db.query.dispatchData.findMany({
        where: and(
          eq(dispatchData.partnerId, ctx.session.userId),
          gte(dispatchData.date, startDate.toISOString().split('T')[0]),
          lte(dispatchData.date, endDate.toISOString().split('T')[0])
        ),
        orderBy: (dispatchData, { desc }) => [desc(dispatchData.date)],
      });

      // Calculate total quantity
      const totalQuantity = data.reduce(
        (sum, item) => sum + parseFloat(item.quantity),
        0
      );

      return {
        data,
        summary: {
          totalQuantity: totalQuantity.toFixed(2),
          recordCount: data.length,
          period: {
            month,
            year,
            dateRange,
          },
        },
      };
    }),

  // Get diesel data for partner with filtering
  getDieselData: partnerProcedure
    .input(dataFilterSchema)
    .query(async ({ ctx, input }) => {
      const { month, year, dateRange } = input;

      // Build date filters
      const startDate = new Date(year, month - 1, 1);
      let endDate = new Date(year, month, 0); // Last day of month

      // Adjust date range if specified
      if (dateRange === '1-15') {
        endDate = new Date(year, month - 1, 15);
      } else if (dateRange === '16-31') {
        startDate.setDate(16);
      }

      const data = await db.query.dieselData.findMany({
        where: and(
          eq(dieselData.partnerId, ctx.session.userId),
          gte(dieselData.date, startDate.toISOString().split('T')[0]),
          lte(dieselData.date, endDate.toISOString().split('T')[0])
        ),
        orderBy: (dieselData, { desc }) => [desc(dieselData.date)],
      });

      // Calculate total volume
      const totalVolume = data.reduce(
        (sum, item) => sum + parseFloat(item.volume),
        0
      );

      return {
        data,
        summary: {
          totalVolume: totalVolume.toFixed(2),
          recordCount: data.length,
          period: {
            month,
            year,
            dateRange,
          },
        },
      };
    }),

  // Get dashboard summary for partner
  getDashboardSummary: partnerProcedure
    .input(dataFilterSchema)
    .query(async ({ ctx, input }) => {
      const { month, year, dateRange } = input;

      // Build date filters
      const startDate = new Date(year, month - 1, 1);
      let endDate = new Date(year, month, 0); // Last day of month

      // Adjust date range if specified
      if (dateRange === '1-15') {
        endDate = new Date(year, month - 1, 15);
      } else if (dateRange === '16-31') {
        startDate.setDate(16);
      }

      // Get dispatch summary (cast text to numeric for SUM)
      const dispatchSummary = await db
        .select({
          totalQuantity: sql<number>`COALESCE(SUM(CAST(quantity AS NUMERIC)), 0)`,
          recordCount: sql<number>`COUNT(*)`,
        })
        .from(dispatchData)
        .where(
          and(
            eq(dispatchData.partnerId, ctx.session.userId),
            gte(dispatchData.date, startDate.toISOString().split('T')[0]),
            lte(dispatchData.date, endDate.toISOString().split('T')[0])
          )
        );

      // Get diesel summary (cast text to numeric for SUM)
      const dieselSummary = await db
        .select({
          totalVolume: sql<number>`COALESCE(SUM(CAST(volume AS NUMERIC)), 0)`,
          recordCount: sql<number>`COUNT(*)`,
        })
        .from(dieselData)
        .where(
          and(
            eq(dieselData.partnerId, ctx.session.userId),
            gte(dieselData.date, startDate.toISOString().split('T')[0]),
            lte(dieselData.date, endDate.toISOString().split('T')[0])
          )
        );

      return {
        dispatch: {
          totalQuantity: Number(dispatchSummary[0]?.totalQuantity || 0).toFixed(
            2
          ),
          recordCount: Number(dispatchSummary[0]?.recordCount || 0),
        },
        diesel: {
          totalVolume: Number(dieselSummary[0]?.totalVolume || 0).toFixed(2),
          recordCount: Number(dieselSummary[0]?.recordCount || 0),
        },
        period: {
          month,
          year,
          dateRange,
        },
      };
    }),

  // Submit a support query
  submitSupportQuery: protectedProcedure
    .input(supportQuerySchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to submit a support query',
        });
      }

      const [query] = await db
        .insert(supportQueries)
        .values({
          partnerId: ctx.session.userId,
          subject: input.subject,
          message: input.message,
          priority: input.priority,
        })
        .returning();

      return query;
    }),

  // Get partner's support queries
  getSupportQueries: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to view support queries',
      });
    }

    const queries = await db.query.supportQueries.findMany({
      where: eq(supportQueries.partnerId, ctx.session.userId),
      orderBy: [desc(supportQueries.createdAt)],
    });

    return queries;
  }),
});
