import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db, withDbErrorHandling } from '@/config/db';
import { partners, admins } from '@/config/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: partners,
      session: 'session', // Will be created automatically
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    // Enhanced password validation
    password: {
      // Better Auth password configuration
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 * 1000, // 5 minutes
    },
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'partner',
        input: false, // Don't allow direct input
      },
      partnerId: {
        type: 'string',
        required: false,
        input: false,
      },
    },
  },
  advanced: {
    generateId: () => crypto.randomUUID(),
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === 'production',
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  rateLimit: {
    enabled: true,
    window: 60, // 1 minute
    max: 100, // 100 requests per minute
    storage: 'memory', // Use Redis in production
  },
  logger: {
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
    disabled: false,
  },
  plugins: [
    // Add plugins as needed for advanced features
  ],
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || 'http://localhost:3000',
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ],
  callbacks: {
    async session({ session, user }: SessionCallbackParams) {
      // Enhance session with additional user data
      return {
        ...session,
        user: {
          ...user,
          role: user.role || 'partner',
        },
      };
    },
  },
});

// Custom authentication functions for our specific use case
export async function authenticatePartner(partnerId: string, password: string) {
  return withDbErrorHandling(async () => {
    const partner = await db.query.partners.findFirst({
      where: (partners, { eq }) => eq(partners.partnerId, partnerId),
    });

    if (!partner) {
      return { success: false, error: 'Invalid partner ID or password' };
    }

    const isValidPassword = await bcrypt.compare(password, partner.password);

    if (!isValidPassword) {
      return { success: false, error: 'Invalid partner ID or password' };
    }

    // Update last login
    await db
      .update(partners)
      .set({ lastLogin: new Date() })
      .where(eq(partners.id, partner.id));

    return {
      success: true,
      partner: {
        id: partner.id,
        name: partner.name,
        partnerId: partner.partnerId,
        role: 'partner',
      },
    };
  }, 'partner authentication').catch((error) => {
    console.error('Partner authentication error:', error);
    return { success: false, error: 'Authentication failed' };
  });
}

export async function authenticateAdmin(username: string, password: string) {
  return withDbErrorHandling(async () => {
    const admin = await db.query.admins.findFirst({
      where: (admins, { eq }) => eq(admins.username, username),
    });

    if (!admin) {
      return { success: false, error: 'Invalid username or password' };
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return { success: false, error: 'Invalid username or password' };
    }

    // Update last login
    await db
      .update(admins)
      .set({ lastLogin: new Date() })
      .where(eq(admins.id, admin.id));

    return {
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        role: 'admin',
      },
    };
  }, 'admin authentication').catch((error) => {
    console.error('Admin authentication error:', error);
    return { success: false, error: 'Authentication failed' };
  });
}

export type AuthUser = {
  id: string;
  name?: string;
  username?: string;
  partnerId?: string;
  role: 'partner' | 'admin';
};

// Better Auth session and user types
interface BetterAuthUser {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  partnerId?: string;
}

interface BetterAuthSession {
  id: string;
  userId: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

interface SessionCallbackParams {
  session: BetterAuthSession;
  user: BetterAuthUser;
}
