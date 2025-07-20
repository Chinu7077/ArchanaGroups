import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { partners } from '@/config/db/schema';

// GET - Fetch all partners
export async function GET() {
  try {
    const data = await db.query.partners.findMany({
      orderBy: (partners, { asc }) => [asc(partners.name)],
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
} 