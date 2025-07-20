import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { dispatchData, dieselData } from '@/config/db/schema';

export async function POST(req: NextRequest) {
  try {
    console.log('🧹 Clearing ALL data from database...');

    // Clear all dispatch data
    const dispatchResult = await db.delete(dispatchData);
    console.log(`🗑️  Cleared ${dispatchResult.rowCount} dispatch records`);

    // Clear all diesel data
    const dieselResult = await db.delete(dieselData);
    console.log(`🗑️  Cleared ${dieselResult.rowCount} diesel records`);

    return NextResponse.json({
      success: true,
      message: 'All data cleared successfully',
      clearedRecords: {
        dispatch: dispatchResult.rowCount,
        diesel: dieselResult.rowCount,
      },
    });

  } catch (error) {
    console.error('❌ Error clearing data:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to clear data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 