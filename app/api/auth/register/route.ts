import { NextRequest, NextResponse } from 'next/server';
import { createUser, requireAdmin } from '@/lib/auth';
import { Role } from '@prisma/client';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Only admins can create new users
    const admin = await requireAdmin();
    
    const body = await request.json();
    const { email, password, role = 'MEMBER' } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate role
    if (!['ADMIN', 'MEMBER', 'PUBLIC'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const user = await createUser(email, password, role as Role);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    if (error instanceof Error && error.message === 'Insufficient permissions') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}


