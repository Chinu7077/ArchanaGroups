import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { type AuthUser } from './config';

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error('SESSION_SECRET environment variable is required');
}

const encodedKey = new TextEncoder().encode(secretKey);

export interface SessionPayload {
  userId: string;
  role: 'partner' | 'admin';
  partnerId?: string;
  username?: string;
  name?: string;
  expiresAt: Date;
  iat?: number; // Issued at time (JWT standard)
  exp?: number; // Expiration time (JWT standard)
}

export async function encrypt(payload: SessionPayload) {
  const jwtPayload: Record<string, unknown> = {
    userId: payload.userId,
    role: payload.role,
    expiresAt: payload.expiresAt.toISOString(),
  };

  if (payload.partnerId) {
    jwtPayload.partnerId = payload.partnerId;
  }
  if (payload.username) {
    jwtPayload.username = payload.username;
  }
  if (payload.name) {
    jwtPayload.name = payload.name;
  }

  return new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });

    // Convert the payload back to SessionPayload with proper Date conversion
    const sessionPayload: SessionPayload = {
      userId: payload.userId as string,
      role: payload.role as 'partner' | 'admin',
      expiresAt: new Date(payload.expiresAt as string),
    };

    if (payload.partnerId) {
      sessionPayload.partnerId = payload.partnerId as string;
    }
    if (payload.username) {
      sessionPayload.username = payload.username as string;
    }
    if (payload.name) {
      sessionPayload.name = payload.name as string;
    }
    if (payload.iat) {
      sessionPayload.iat = payload.iat as number;
    }
    if (payload.exp) {
      sessionPayload.exp = payload.exp as number;
    }

    return sessionPayload;
  } catch (error) {
    console.log('Failed to verify session');
    return null;
  }
}

export async function createSession(user: AuthUser) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const sessionPayload: SessionPayload = {
    userId: user.id,
    role: user.role,
    expiresAt,
    ...(user.partnerId && { partnerId: user.partnerId }),
    ...(user.username && { username: user.username }),
    ...(user.name && { name: user.name }),
  };

  const session = await encrypt(sessionPayload);

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  return session;
}

export async function verifySession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;

  if (!cookie) {
    if (process.env.NODE_ENV === 'development') {
      console.log('No session cookie found');
    }
    return null;
  }

  const session = await decrypt(cookie);

  if (!session?.userId) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Session decryption failed or no userId');
    }
    return null;
  }

  // Check if session is expired
  if (session.expiresAt && new Date() > session.expiresAt) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Session expired:', {
        expiresAt: session.expiresAt,
        now: new Date(),
      });
    }
    // Clear expired session
    cookieStore.delete('session');
    return null;
  }

  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function updateSession() {
  const session = await verifySession();

  if (!session) {
    return null;
  }

  const refreshedSession = await encrypt({
    ...session,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  const cookieStore = await cookies();
  cookieStore.set('session', refreshedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: 'lax',
    path: '/',
  });

  return refreshedSession;
}
