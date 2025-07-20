import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { dispatchData, dieselData } from '@/config/db/schema';

export async function POST(req: NextRequest) {
  try {
    const { clearPartners } = await req.json();
    
    console.log('🧹 Clearing data from database...');

    // Clear all dispatch data
    const dispatchResult = await db.delete(dispatchData);
    console.log(`🗑️  Cleared ${dispatchResult.rowCount} dispatch records`);

    // Clear all diesel data
    const dieselResult = await db.delete(dieselData);
    console.log(`🗑️  Cleared ${dieselResult.rowCount} diesel records`);

    let partnersResult = { rowCount: 0 };
    if (clearPartners) {
      // Clear all partners (except admins)
      partnersResult = await db.delete(partners);
      console.log(`🗑️  Cleared ${partnersResult.rowCount} partner records`);
    }

    return NextResponse.json({
      success: true,
      message: clearPartners ? 'All data and partners cleared successfully' : 'All data cleared successfully',
      clearedRecords: {
        dispatch: dispatchResult.rowCount,
        diesel: dieselResult.rowCount,
        partners: partnersResult.rowCount,
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