import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { dispatchData } from '@/config/db/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch all dispatch data
export async function GET() {
  try {
    const data = await db.query.dispatchData.findMany({
      orderBy: (dispatchData, { desc }) => [desc(dispatchData.createdAt)],
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error fetching dispatch data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dispatch data' },
      { status: 500 }
    );
  }
}

// PUT - Update dispatch record
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Record ID is required' },
        { status: 400 }
      );
    }

    const [updatedRecord] = await db
      .update(dispatchData)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(dispatchData.id, id))
      .returning();

    if (!updatedRecord) {
      return NextResponse.json(
        { success: false, error: 'Record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedRecord,
    });
  } catch (error) {
    console.error('Error updating dispatch record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update dispatch record' },
      { status: 500 }
    );
  }
} 