import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/features/auth/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    // Clear the session server-side
    await deleteSession();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Session cleared successfully' 
    });
  } catch (error) {
    // Even if there's an error, we consider it successful
    // since the goal is to ensure no active session
    return NextResponse.json({ 
      success: true, 
      message: 'Session cleanup completed' 
    });
  }
} 