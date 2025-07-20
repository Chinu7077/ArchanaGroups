import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/features/auth/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    console.log('🚪 Logging out user...');
    
    // Clear the session
    await deleteSession();
    
    console.log('✅ User logged out successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });
    
  } catch (error) {
    console.error('❌ Logout error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Logout failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 