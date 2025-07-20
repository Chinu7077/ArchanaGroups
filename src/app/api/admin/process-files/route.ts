import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { partners, dispatchData, dieselData } from '@/config/db/schema';
import { eq, and, inArray, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import * as XLSX from 'xlsx';

// Parse XLSX file content directly from File object
async function parseXlsxFileContent(file: File): Promise<any[]> {
  try {
    console.log(`🔍 Parsing file: ${file.name} (${file.size} bytes, type: ${file.type})`);
    
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
    throw new Error(
      `Failed to parse XLSX file ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// Convert Excel date to string
function excelDateToDateString(excelDate: number): string {
  const date = new Date((excelDate - 25569) * 86400 * 1000);
  return date.toISOString().split('T')[0];
}

// Generate partner ID from name
function generatePartnerId(name: string): string {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
  const digits = Math.floor(Math.random() * 9000) + 1000;
  return `${initials}${digits}`;
}

// Generate secure password
function generatePassword(): string {
  return nanoid(12);
}

// Batch insert function for better performance
async function batchInsertDispatchData(data: any[]) {
  if (data.length === 0) return;
  
  // Insert in batches of 100 for better performance
  const batchSize = 100;
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    await db.insert(dispatchData).values(batch);
  }
}

async function batchInsertDieselData(data: any[]) {
  if (data.length === 0) return;
  
  // Insert in batches of 100 for better performance
  const batchSize = 100;
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    await db.insert(dieselData).values(batch);
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('🚀 Starting file processing...');
    
    // Test database connection
    try {
      await db.execute(sql`SELECT 1`);
      console.log('✅ Database connection successful');
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      return NextResponse.json(
        {
          success: false,
          error: 'Database connection failed. Please try again.',
        },
        { status: 500 }
      );
    }
    
    // Get form data
    const formData = await req.formData();
    const dispatchFile = formData.get('dispatchFile') as File | null;
    const dieselFile = formData.get('dieselFile') as File | null;
    const forceUpload = formData.get('forceUpload') === 'true'; // New option to bypass duplicates

    console.log('📁 Files received:', {
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
    });

    if (!dispatchFile && !dieselFile) {
      return NextResponse.json(
        { 
          success: false,
          error: 'At least one file is required',
          message: 'Please select at least one Excel file to upload.'
        },
        { status: 400 }
      );
    }

    // Validate file types with detailed logging
    if (dispatchFile) {
      console.log(`🔍 Validating dispatch file: ${dispatchFile.name}`);
      console.log(`   Size: ${dispatchFile.size} bytes`);
      console.log(`   Type: ${dispatchFile.type}`);
      console.log(`   Extension: ${dispatchFile.name.split('.').pop()}`);
      
      if (!dispatchFile.name.match(/\.(xlsx|xls)$/i)) {
        console.log(`❌ Invalid dispatch file format: ${dispatchFile.name}`);
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid dispatch file format',
            message: `Dispatch file "${dispatchFile.name}" must be an Excel file (.xlsx or .xls). Current extension: ${dispatchFile.name.split('.').pop()}`
          },
          { status: 400 }
        );
      }
      console.log(`✅ Dispatch file format is valid`);
    }

    if (dieselFile) {
      console.log(`🔍 Validating diesel file: ${dieselFile.name}`);
      console.log(`   Size: ${dieselFile.size} bytes`);
      console.log(`   Type: ${dieselFile.type}`);
      console.log(`   Extension: ${dieselFile.name.split('.').pop()}`);
      
      if (!dieselFile.name.match(/\.(xlsx|xls)$/i)) {
        console.log(`❌ Invalid diesel file format: ${dieselFile.name}`);
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid diesel file format',
            message: `Diesel file "${dieselFile.name}" must be an Excel file (.xlsx or .xls). Current extension: ${dieselFile.name.split('.').pop()}`
          },
          { status: 400 }
        );
      }
      console.log(`✅ Diesel file format is valid`);
    }

    // Validate file sizes (max 10MB each)
    if (dispatchFile && dispatchFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dispatch file too large',
          message: 'Dispatch file must be less than 10MB'
        },
        { status: 400 }
      );
    }

    if (dieselFile && dieselFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          error: 'Diesel file too large',
          message: 'Diesel file must be less than 10MB'
        },
        { status: 400 }
      );
    }

    let successfulRows = 0;
    let failedRows = 0;
    let skippedDuplicates = 0;
    const newPartners: string[] = [];
    const errors: string[] = [];
    
    // Create a map to store vehicle-to-partner mapping from current dispatch file processing
    const vehiclePartnerMap = new Map<string, string>();

    // Pre-validate diesel file if provided
    let dispatchVehicleNumbers: Set<string> = new Set();
    
    // If dispatch file is provided, collect vehicle numbers from it
    if (dispatchFile) {
      console.log('Collecting vehicle numbers from dispatch file');
      try {
        const dispatchRows = await parseXlsxFileContent(dispatchFile);
        console.log('Dispatch file parsed successfully, rows:', dispatchRows.length);
        console.log('First few rows:', dispatchRows.slice(0, 3));
        
        // Skip header row and collect all vehicle numbers
        for (let i = 1; i < dispatchRows.length; i++) {
          const row = dispatchRows[i];
          if (row.length < 6) {
            console.log(`Skipping incomplete row ${i}:`, row);
            continue; // Skip incomplete rows
          }
          
          const vehicleNumber = row[1];
          if (vehicleNumber) {
            dispatchVehicleNumbers.add(vehicleNumber.toUpperCase());
          }
        }
        console.log('Vehicle numbers collected:', Array.from(dispatchVehicleNumbers));
      } catch (parseError) {
        console.error('Error parsing dispatch file:', parseError);
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to parse dispatch file',
            message: `Error reading dispatch file: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`
          },
          { status: 400 }
        );
      }
    }
    
    if (dieselFile) {
      console.log('Pre-validating diesel file for partner matches');
      const dieselRows = await parseXlsxFileContent(dieselFile);
      const unmatchedDieselVehicles: string[] = [];

      // Check all diesel vehicle numbers against both database and current dispatch file
      for (let i = 1; i < dieselRows.length; i++) {
        const row = dieselRows[i];
        if (row.length < 6) continue; // Skip incomplete rows

        const vehicleNumber = row[1]; // Only need vehicle number for validation
        const upperVehicleNumber = vehicleNumber.toUpperCase();

        // First check if vehicle exists in current dispatch file
        const existsInCurrentFile = dispatchVehicleNumbers.has(upperVehicleNumber);
        
        if (!existsInCurrentFile) {
          // If not in current file, check if vehicle exists in database
          const existingDispatch = await db.query.dispatchData.findFirst({
            where: eq(dispatchData.vehicleNumber, upperVehicleNumber),
          });

          if (!existingDispatch) {
            unmatchedDieselVehicles.push(vehicleNumber);
          }
        }
      }

      // If any unmatched vehicles found, return error immediately
      if (unmatchedDieselVehicles.length > 0) {
        const uniqueVehicles = [...new Set(unmatchedDieselVehicles)];
        return NextResponse.json(
          {
            success: false,
            error: 'Diesel data validation failed',
            unmatchedVehicles: uniqueVehicles,
            message: `Cannot process diesel data: ${uniqueVehicles.length} vehicle(s) not found in dispatch data. Please upload dispatch data for these vehicles first: ${uniqueVehicles.join(', ')}`,
          },
          { status: 400 }
        );
      }
    }

    // Process dispatch file with optimized batch processing
    if (dispatchFile) {
      console.log('Processing dispatch file with batch optimization');
      const dispatchRows = await parseXlsxFileContent(dispatchFile);
      
      // Collect all unique owner names for batch partner lookup
      const ownerNames = new Set<string>();
      const dispatchDataToInsert: any[] = [];
      
      // First pass: collect all owner names and prepare data
      for (let i = 1; i < dispatchRows.length; i++) {
        const row = dispatchRows[i];
        if (row.length < 6) continue;

        const [, , , , , ownerName] = row;
        if (ownerName?.trim()) {
          ownerNames.add(ownerName.trim());
        }
      }

      // Batch fetch all existing partners
      const existingPartners = await db.query.partners.findMany({
        where: inArray(partners.name, Array.from(ownerNames)),
      });
      const partnerMap = new Map(existingPartners.map(p => [p.name, p]));

      // Create new partners in batch
      const newPartnerNames = Array.from(ownerNames).filter(name => !partnerMap.has(name));
      const newPartnersToCreate: any[] = [];
      
      for (const name of newPartnerNames) {
        let partnerId = generatePartnerId(name);
        let attempts = 0;
        
        while (attempts < 10) {
          const existing = await db.query.partners.findFirst({
            where: eq(partners.partnerId, partnerId),
          });
          if (!existing) break;
          partnerId = generatePartnerId(name);
          attempts++;
        }

        if (attempts >= 10) {
          errors.push(`Failed to generate unique partner ID for ${name}`);
          continue;
        }

        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password, 12);
        
        newPartnersToCreate.push({
          name: name.trim(),
          partnerId,
          password: hashedPassword,
        });
      }

      // Batch insert new partners
      if (newPartnersToCreate.length > 0) {
        const createdPartners = await db.insert(partners).values(newPartnersToCreate).returning();
        createdPartners.forEach(partner => {
          partnerMap.set(partner.name, partner);
          newPartners.push(partner.name);
        });
      }

      // Second pass: prepare dispatch data for batch insertion
      for (let i = 1; i < dispatchRows.length; i++) {
        const row = dispatchRows[i];
        if (row.length < 6) continue;

        try {
          const [date, vehicleNumber, material, quantity, destination, ownerName] = row;
          
          if (!ownerName?.trim()) continue;

          const partner = partnerMap.get(ownerName.trim());
          if (!partner) {
            errors.push(`Partner not found for ${ownerName}`);
            failedRows++;
            continue;
          }

          const dateString = typeof date === 'number'
            ? excelDateToDateString(date)
            : new Date(date).toISOString().split('T')[0];

          // Check for duplicates (very flexible - only check date + vehicle)
          if (!forceUpload) {
            const existingDispatch = await db.query.dispatchData.findFirst({
              where: and(
                eq(dispatchData.date, dateString),
                eq(dispatchData.vehicleNumber, vehicleNumber.toUpperCase())
              ),
            });

            if (existingDispatch) {
              console.log(`⏭️  Skipping duplicate: ${dateString} - ${vehicleNumber}`);
              skippedDuplicates++;
              continue;
            }
          }

          // Prepare data for batch insertion
          dispatchDataToInsert.push({
            date: dateString,
            vehicleNumber: vehicleNumber.toUpperCase(),
            material: material,
            quantity: quantity,
            destination: destination,
            ownerName: ownerName.trim(),
            partnerId: partner.id,
          });

          // Store vehicle-partner mapping
          vehiclePartnerMap.set(vehicleNumber.toUpperCase(), partner.id);
          successfulRows++;
        } catch (error) {
          errors.push(`Dispatch row ${i} error: ${error instanceof Error ? error.message : 'Unknown error'}`);
          failedRows++;
        }
      }

      // Batch insert all dispatch data
      await batchInsertDispatchData(dispatchDataToInsert);
    }

    // Process diesel file with optimized batch processing
    if (dieselFile) {
      console.log('Processing diesel file with batch optimization');
      const dieselRows = await parseXlsxFileContent(dieselFile);
      const dieselDataToInsert: any[] = [];

      // Get all vehicle numbers from current batch and database
      const allVehicleNumbers = Array.from(vehiclePartnerMap.keys());
      const existingDispatchData = await db.query.dispatchData.findMany({
        where: inArray(dispatchData.vehicleNumber, allVehicleNumbers),
        with: { partner: true },
      });

      // Create vehicle to partner mapping from database
      existingDispatchData.forEach(dispatch => {
        if (dispatch.partnerId) {
          vehiclePartnerMap.set(dispatch.vehicleNumber, dispatch.partnerId);
        }
      });

      for (let i = 1; i < dieselRows.length; i++) {
        const row = dieselRows[i];
        if (row.length < 6) continue;

        try {
          const [date, vehicleNumber, volume, item, fuelStation, status] = row;
          const upperVehicleNumber = vehicleNumber.toUpperCase();

          const partnerId = vehiclePartnerMap.get(upperVehicleNumber);
          if (!partnerId) {
            errors.push(`Diesel row ${i} error: No partner found for vehicle ${vehicleNumber}`);
            failedRows++;
            continue;
          }

          const dateString = typeof date === 'number'
            ? excelDateToDateString(date)
            : new Date(date).toISOString().split('T')[0];

          // Check for duplicates (very flexible - only check date + vehicle)
          if (!forceUpload) {
            const existingDiesel = await db.query.dieselData.findFirst({
              where: and(
                eq(dieselData.date, dateString),
                eq(dieselData.vehicleNumber, upperVehicleNumber)
              ),
            });

            if (existingDiesel) {
              console.log(`⏭️  Skipping duplicate diesel: ${dateString} - ${vehicleNumber}`);
              skippedDuplicates++;
              continue;
            }
          }

          // Prepare data for batch insertion
          dieselDataToInsert.push({
            date: dateString,
            vehicleNumber: upperVehicleNumber,
            volume: volume,
            item: item,
            fuelStation: fuelStation,
            status: status,
            partnerId: partnerId,
          });

          successfulRows++;
        } catch (error) {
          errors.push(`Diesel row ${i} error: ${error instanceof Error ? error.message : 'Unknown error'}`);
          failedRows++;
        }
      }

      // Batch insert all diesel data
      await batchInsertDieselData(dieselDataToInsert);
    }

    return NextResponse.json({
      success: true,
      successfulRows,
      failedRows,
      skippedDuplicates,
      newPartners,
      errors: errors.length > 0 ? errors : undefined,
      message: skippedDuplicates > 0
        ? `${skippedDuplicates} duplicate records were skipped to prevent duplication.`
        : undefined,
    });
  } catch (error) {
    console.error('❌ File processing error:', error);
    
    // Ensure we always return valid JSON
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      {
        success: false,
        error: `File processing failed: ${errorMessage}`,
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}
