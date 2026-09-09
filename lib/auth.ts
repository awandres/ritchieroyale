import { cookies } from 'next/headers';
import { db } from './db';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

const SESSION_COOKIE_NAME = 'rr_session';
const SESSION_DURATION_DAYS = 30;

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate a secure random token
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

// Session management
export async function createSession(userId: string): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);

  await db.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  // Set HTTP-only cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });

  return token;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const session = await db.session.findUnique({
    where: { token },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          member: {
            select: {
              id: true,
              displayName: true,
            },
          },
        },
      },
    },
  });

  if (!session || session.expiresAt < new Date()) {
    // Session expired or not found - clear cookie
    if (session) {
      await db.session.delete({ where: { id: session.id } });
    }
    const store = await cookies();
    store.delete(SESSION_COOKIE_NAME);
    return null;
  }

  return session;
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await db.session.deleteMany({ where: { token } });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}

// Auth helpers
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

export async function requireRole(allowedRoles: Role[]) {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Insufficient permissions');
  }
  return user;
}

export async function requireAdmin() {
  return requireRole(['ADMIN']);
}

export async function requireMember() {
  return requireRole(['ADMIN', 'MEMBER']);
}

// User operations
export async function createUser(email: string, password: string, role: Role = 'PUBLIC') {
  const passwordHash = await hashPassword(password);
  
  return db.user.create({
    data: {
      email: email.toLowerCase().trim(),
      passwordHash,
      role,
    },
  });
}

export async function authenticateUser(email: string, password: string) {
  const user = await db.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  if (!user || !user.passwordHash) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  return user;
}

// Clean up expired sessions (can be called periodically)
export async function cleanupExpiredSessions(): Promise<number> {
  const result = await db.session.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  });
  return result.count;
}


