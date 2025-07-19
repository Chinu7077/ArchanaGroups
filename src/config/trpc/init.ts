import { initTRPC, TRPCError } from '@trpc/server';
import { type TRPCContext } from './context';
import superjson from 'superjson';
import { ZodError } from 'zod';

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
    };
  },
  isDev: process.env.NODE_ENV === 'development',
});

// Enhanced logging middleware
const logging = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;

  if (process.env.NODE_ENV === 'development') {
    const meta = { path, type, durationMs };
    result.ok
      ? console.log('✅ tRPC OK request', meta)
      : console.error('❌ tRPC Error request', meta, result.error);
  }

  return result;
});

// Rate limiting middleware
const rateLimit = t.middleware(async ({ ctx, next }) => {
  // Simple in-memory rate limiting (consider Redis for production)
  const ip =
    ctx.req?.headers?.['x-forwarded-for'] || ctx.req?.connection?.remoteAddress;

  // For now, just log - implement proper rate limiting based on your needs
  if (process.env.NODE_ENV === 'development' && ip) {
    console.log(`🌐 Request from IP: ${ip}`);
  }

  return next();
});

// Middleware to check if user is authenticated
const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.userId) {
    console.warn('🔒 Unauthorized access attempt');
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message:
        'Authentication required. Please log in to access this resource.',
      cause: 'NO_SESSION',
    });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.session, // Ensure user context is available
    },
  });
});

// Middleware to check if user is an admin
const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
      cause: 'NO_SESSION',
    });
  }

  if (ctx.session.role !== 'admin') {
    console.warn(
      `🚫 Admin access denied for user ${ctx.session.userId} with role ${ctx.session.role}`
    );
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Administrator privileges required to access this resource',
      cause: 'INSUFFICIENT_PERMISSIONS',
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.session,
    },
  });
});

// Middleware to check if user is a partner
const isPartner = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
      cause: 'NO_SESSION',
    });
  }

  if (ctx.session.role !== 'partner') {
    console.warn(
      `🚫 Partner access denied for user ${ctx.session.userId} with role ${ctx.session.role}`
    );
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Partner access required to access this resource',
      cause: 'INSUFFICIENT_PERMISSIONS',
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.session,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure.use(logging).use(rateLimit);
export const protectedProcedure = t.procedure
  .use(logging)
  .use(rateLimit)
  .use(isAuthenticated);
export const adminProcedure = t.procedure
  .use(logging)
  .use(rateLimit)
  .use(isAdmin);
export const partnerProcedure = t.procedure
  .use(logging)
  .use(rateLimit)
  .use(isPartner);
