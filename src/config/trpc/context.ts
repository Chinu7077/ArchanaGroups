import { auth } from '@/features/auth/lib/auth/config';
import {
  SessionPayload,
  verifySession,
} from '@/features/auth/lib/auth/session';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';

// Flexible context options that work with both App Router and Pages Router
type FlexibleContextOptions =
  | CreateNextContextOptions
  | {
      req: CreateNextContextOptions['req'];
      res: CreateNextContextOptions['res'];
    };

export interface Context {
  session: SessionPayload | null;
  betterAuthSession?: {
    user?: {
      id: string;
      email?: string;
      name?: string;
    };
    session?: {
      id: string;
      userId: string;
      expiresAt: Date;
    };
  } | null;
  req: CreateNextContextOptions['req'];
  res: CreateNextContextOptions['res'];
}

export async function createTRPCContext(
  opts: FlexibleContextOptions
): Promise<Context> {
  const { req, res } = opts;

  // Get session from both custom session and Better Auth
  const session = await verifySession();

  // Try to get Better Auth session as well for enhanced features
  let betterAuthSession = null;
  try {
    // Handle headers properly for both NextRequest and regular request objects
    const headers = req.headers;
    const headerEntries =
      headers instanceof Headers
        ? Array.from(headers.entries())
        : Object.entries(headers);

    // In the future, when fully migrating to Better Auth, this will be the primary session
    betterAuthSession = await auth.api.getSession({
      headers: new Headers(
        headerEntries.reduce(
          (acc, [key, value]) => {
            if (value) {
              acc[key] = Array.isArray(value) ? value.join(', ') : value;
            }
            return acc;
          },
          {} as Record<string, string>
        )
      ),
    });
  } catch (error) {
    // Better Auth session not available, continue with custom session
    console.log('Better Auth session not available:', error);
  }

  return {
    session,
    betterAuthSession: betterAuthSession as Context['betterAuthSession'],
    req,
    res,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
