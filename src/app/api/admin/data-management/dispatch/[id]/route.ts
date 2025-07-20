import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { dispatchData } from '@/config/db/schema';
import { eq } from 'drizzle-orm';

// DELETE - Delete dispatch record by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Record ID is required' },
        { status: 400 }
      );
    }

    const [deletedRecord] = await db
      .delete(dispatchData)
      .where(eq(dispatchData.id, id))
      .returning();

    if (!deletedRecord) {
      return NextResponse.json(
        { success: false, error: 'Record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Dispatch record deleted successfully',
      data: deletedRecord,
    });
  } catch (error) {
    console.error('Error deleting dispatch record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete dispatch record' },
      { status: 500 }
    );
  }
} 