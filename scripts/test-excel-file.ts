import { loadEnvConfig } from '@next/env';
import * as XLSX from 'xlsx';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load environment variables like Next.js does
loadEnvConfig(process.cwd());

async function testExcelFile(filePath: string) {
  try {
    console.log(`🔍 Testing Excel file: ${filePath}`);
    
    // Read the file
    const buffer = readFileSync(filePath);
    console.log(`📊 File size: ${buffer.length} bytes`);
    
    // Parse the workbook
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    console.log(`📋 Workbook sheets: ${workbook.SheetNames.join(', ')}`);
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    if (!worksheet) {
      console.error('❌ No worksheet found');
      return;
    }
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log(`📈 Total rows: ${jsonData.length}`);
    
    if (jsonData.length === 0) {
      console.error('❌ File appears to be empty');
      return;
    }
    
    // Show first few rows
    console.log('\n📋 First 3 rows:');
    for (let i = 0; i < Math.min(3, jsonData.length); i++) {
      console.log(`Row ${i + 1}:`, jsonData[i]);
    }
    
    // Check for required columns (for dispatch file)
    if (jsonData.length > 0) {
      const firstRow = jsonData[0] as any[];
      console.log('\n📊 Column headers:', firstRow);
      
      if (firstRow.length >= 6) {
        console.log('✅ File has at least 6 columns (good for dispatch data)');
      } else {
        console.log('⚠️  File has fewer than 6 columns (might be missing data)');
      }
    }
    
    console.log('\n✅ File parsing successful!');
    
  } catch (error) {
    console.error('❌ Error testing file:', error);
  }
}

// Get file path from command line argument
const filePath = process.argv[2];

if (!filePath) {
  console.log('Usage: npx tsx scripts/test-excel-file.ts <path-to-excel-file>');
  console.log('Example: npx tsx scripts/test-excel-file.ts ./test.xlsx');
  process.exit(1);
}

testExcelFile(filePath); 