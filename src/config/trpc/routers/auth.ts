import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../init';

import { TRPCError } from '@trpc/server';
import { partnerLoginSchema, loginSchema } from '@/config/db';
import {
  authenticatePartner,
  authenticateAdmin,
} from '@/features/auth/lib/auth/config';
import {
  createSession,
  deleteSession,
  verifySession,
} from '@/features/auth/lib/auth/session';

export const authRouter = router({
  // Partner login
  partnerLogin: publicProcedure
    .input(partnerLoginSchema)
    .mutation(async ({ input }) => {
      const result = await authenticatePartner(input.partnerId, input.password);

      if (!result.success) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: result.error,
        });
      }

      if ('partner' in result && result.partner) {
        await createSession({ ...result.partner, role: 'partner' as const });

        return {
          success: true,
          user: result.partner,
        };
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Partner authentication failed',
      });
    }),

  // Admin login
  adminLogin: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const result = await authenticateAdmin(input.username, input.password);

    if (!result.success) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: result.error,
      });
    }

    if ('admin' in result && result.admin) {
      await createSession({ ...result.admin, role: 'admin' as const });

      return {
        success: true,
        user: result.admin,
      };
    }

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Admin authentication failed',
    });
  }),

  // Logout
  logout: protectedProcedure.mutation(async () => {
    await deleteSession();
    return { success: true };
  }),

  // Get current user (public procedure to avoid 401 errors)
  getUser: publicProcedure.query(async () => {
    const session = await verifySession();
    
    if (!session) {
      return null;
    }
    
    return {
      id: session.userId,
      role: session.role,
      partnerId: session.partnerId,
      username: session.username,
      name: session.name,
    };
  }),

  // Check session validity
  checkAuth: publicProcedure.query(async () => {
    const session = await verifySession();

    if (!session) {
      return { authenticated: false };
    }

    return {
      authenticated: true,
      user: {
        id: session.userId,
        role: session.role,
        partnerId: session.partnerId,
        username: session.username,
        name: session.name,
      },
    };
  }),
});
