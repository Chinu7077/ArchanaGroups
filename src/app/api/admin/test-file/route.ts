import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

async function parseXlsxFileContent(file: File): Promise<any[]> {
  try {
    console.log(`🔍 Testing file: ${file.name} (${file.size} bytes, type: ${file.type})`);
    
    const arrayBuffer = await file.arrayBuffer();
    console.log(`📊 File loaded, buffer size: ${arrayBuffer.byteLength} bytes`);
    
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    console.log(`📋 Workbook sheets: ${workbook.SheetNames.join(', ')}`);
    
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    if (!worksheet) {
      throw new Error('No worksheet found in the Excel file');
    }
    
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log(`📈 Parsed ${jsonData.length} rows from sheet: ${sheetName}`);
    
    if (jsonData.length === 0) {
      throw new Error('Excel file appears to be empty');
    }
    
    return jsonData as any[];
  } catch (error) {
    console.error('❌ Error parsing Excel file:', error);
    throw new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('🧪 Starting file test...');
    
    const formData = await req.formData();
    const testFile = formData.get('file') as File | null;

    if (!testFile) {
      return NextResponse.json(
        {
          success: false,
          error: 'No file provided',
          message: 'Please select a file to test'
        },
        { status: 400 }
      );
    }

    console.log('📁 File received for testing:', {
      name: testFile.name,
      size: testFile.size,
      type: testFile.type,
      lastModified: testFile.lastModified
    });

    // Test file parsing
    const data = await parseXlsxFileContent(testFile);
    
    // Show first few rows
    const preview = data.slice(0, 3);
    
    return NextResponse.json({
      success: true,
      message: 'File parsed successfully',
      fileInfo: {
        name: testFile.name,
        size: testFile.size,
        type: testFile.type,
        totalRows: data.length,
        totalColumns: data[0]?.length || 0
      },
      preview: preview,
      headers: data[0] || []
    });

  } catch (error) {
    console.error('❌ File test error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'File test failed',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
} 