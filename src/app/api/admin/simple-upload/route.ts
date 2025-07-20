import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('🧪 Simple upload test starting...');
    
    const formData = await req.formData();
    
    console.log('📁 FormData received:');
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }
    
    const dispatchFile = formData.get('dispatchFile') as File | null;
    const dieselFile = formData.get('dieselFile') as File | null;
    
    if (!dispatchFile && !dieselFile) {
      return NextResponse.json({
        success: false,
        error: 'No files received',
        message: 'No files were sent in the request'
      }, { status: 400 });
    }
    
    const results = {
      dispatchFile: dispatchFile ? {
        name: dispatchFile.name,
        size: dispatchFile.size,
        type: dispatchFile.type,
        lastModified: dispatchFile.lastModified
      } : null,
      dieselFile: dieselFile ? {
        name: dieselFile.name,
        size: dieselFile.size,
        type: dieselFile.type,
        lastModified: dieselFile.lastModified
      } : null
    };
    
    console.log('✅ Simple upload test successful:', results);
    
    return NextResponse.json({
      success: true,
      message: 'Files received successfully (no validation performed)',
      files: results
    });
    
  } catch (error) {
    console.error('❌ Simple upload test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Simple upload failed',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
} 