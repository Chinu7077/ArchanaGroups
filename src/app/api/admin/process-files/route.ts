import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { partners, dispatchData, dieselData } from '@/config/db/schema';
import { eq, and } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import * as XLSX from 'xlsx';

// Parse XLSX file content directly from File object
async function parseXlsxFileContent(file: File): Promise<any[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    return jsonData as any[];
  } catch (error) {
    throw new Error(
      `Failed to parse XLSX file ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// Generate partner ID format: initials + 4 digits
function generatePartnerId(name: string): string {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);

  const digits = Math.floor(1000 + Math.random() * 9000);
  return `${initials}${digits}`;
}

// Generate secure password
function generatePassword(): string {
  return nanoid(12);
}

// Convert Excel date serial number to date string (YYYY-MM-DD format)
function excelDateToDateString(serial: number): string {
  // Excel epoch starts at January 1, 1900
  // But Excel incorrectly treats 1900 as a leap year, so we need to adjust
  const utcDays = Math.floor(serial - 25569);
  const utcValue = utcDays * 86400;
  const dateInfo = new Date(utcValue * 1000);
  const date = new Date(
    dateInfo.getFullYear(),
    dateInfo.getMonth(),
    dateInfo.getDate()
  );
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
}

export async function POST(req: NextRequest) {
  try {
    // Get form data
    const formData = await req.formData();
    const dispatchFile = formData.get('dispatchFile') as File | null;
    const dieselFile = formData.get('dieselFile') as File | null;

    if (!dispatchFile && !dieselFile) {
      return NextResponse.json(
        { error: 'At least one file is required' },
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

    // Pre-validate diesel file if provided (now using owner name instead of vehicle validation)
    if (dieselFile) {
      console.log('Pre-validating diesel file for owner name matches');
      const dieselRows = await parseXlsxFileContent(dieselFile);
      const unmatchedOwners: string[] = [];

      // Check all diesel owner names against database
      for (let i = 1; i < dieselRows.length; i++) {
        const row = dieselRows[i];
        if (row.length < 7) continue; // Skip incomplete rows (now expecting 7 columns including owner name)

        const ownerName = row[6]; // Owner name is now the 7th column (index 6)
        if (!ownerName?.trim()) continue;

        // Check if owner exists in database
        const existingPartner = await db.query.partners.findFirst({
          where: eq(partners.name, ownerName.trim()),
        });

        if (!existingPartner) {
          unmatchedOwners.push(ownerName.trim());
        }
      }

      // If any unmatched owners found, return error immediately
      if (unmatchedOwners.length > 0) {
        const uniqueOwners = [...new Set(unmatchedOwners)];
        return NextResponse.json(
          {
            success: false,
            error: 'Diesel data validation failed',
            unmatchedOwners: uniqueOwners,
            message: `Cannot process diesel data: ${uniqueOwners.length} owner(s) not found in database. Please ensure these owners have dispatch data uploaded first: ${uniqueOwners.join(', ')}`,
          },
          { status: 400 }
        );
      }
    }

    // Process dispatch file
    if (dispatchFile) {
      console.log('Processing dispatch file');
      const dispatchRows = await parseXlsxFileContent(dispatchFile);
      console.log({ dispatchRows });

      // Skip header row (assuming first row is header)
      for (let i = 1; i < dispatchRows.length; i++) {
        const row = dispatchRows[i];
        if (row.length < 6) continue; // Skip incomplete rows

        try {
          const [
            date,
            vehicleNumber,
            material,
            quantity,
            destination,
            ownerName,
          ] = row;

          if (!ownerName?.trim()) continue;

          // Check if partner exists or create new one
          let partner = await db.query.partners.findFirst({
            where: eq(partners.name, ownerName.trim()),
          });

          if (!partner) {
            // Generate unique partner ID
            let partnerId = generatePartnerId(ownerName);
            let attempts = 0;

            while (attempts < 10) {
              const existing = await db.query.partners.findFirst({
                where: eq(partners.partnerId, partnerId),
              });

              if (!existing) break;
              partnerId = generatePartnerId(ownerName);
              attempts++;
            }

            if (attempts >= 10) {
              errors.push(
                `Failed to generate unique partner ID for ${ownerName}`
              );
              failedRows++;
              continue;
            }

            // Create new partner
            const password = generatePassword();
            const hashedPassword = await bcrypt.hash(password, 12);

            const [newPartner] = await db
              .insert(partners)
              .values({
                name: ownerName.trim(),
                partnerId,
                password: hashedPassword,
              })
              .returning();

            partner = newPartner;
            newPartners.push(partner.name);
          }

          // Check if this dispatch record already exists
          const dateString =
            typeof date === 'number'
              ? excelDateToDateString(date)
              : new Date(date).toISOString().split('T')[0];
          const existingDispatch = await db.query.dispatchData.findFirst({
            where: and(
              eq(dispatchData.date, dateString),
              eq(dispatchData.vehicleNumber, vehicleNumber.toUpperCase()),
              eq(dispatchData.material, material),
              eq(dispatchData.quantity, quantity.toString()),
              eq(dispatchData.destination, destination),
              eq(dispatchData.ownerName, ownerName.trim())
            ),
          });

          if (existingDispatch) {
            console.log(
              `Skipping duplicate dispatch record: ${dateString} - ${vehicleNumber} - ${ownerName}`
            );
            skippedDuplicates++;
            continue; // Skip duplicate record
          }

          // Insert dispatch data
          await db.insert(dispatchData).values({
            date: dateString,
            vehicleNumber: vehicleNumber.toUpperCase(),
            material: material,
            quantity: quantity,
            destination: destination,
            ownerName: ownerName.trim(),
            partnerId: partner.id,
          });

          // Store the vehicle-partner mapping for diesel processing
          vehiclePartnerMap.set(vehicleNumber.toUpperCase(), partner.id);

          successfulRows++;
        } catch (error) {
          errors.push(
            `Dispatch row ${i} error: ${error instanceof Error ? error.message : 'Unknown error'}`
          );
          failedRows++;
        }
      }
    }

    // Process diesel file
    if (dieselFile) {
      const dieselRows = await parseXlsxFileContent(dieselFile);
      console.log({ dieselRows });
      // Skip header row (assuming first row is header)
      for (let i = 1; i < dieselRows.length; i++) {
        const row = dieselRows[i];
        if (row.length < 7) continue; // Skip incomplete rows (now expecting 7 columns including owner name)

        try {
          const [date, vehicleNumber, volume, item, fuelStation, status, ownerName] = row;
          const upperVehicleNumber = vehicleNumber.toUpperCase();

          // Find partner by owner name (we've already validated that owner exists)
          const partner = await db.query.partners.findFirst({
            where: eq(partners.name, ownerName.trim()),
          });

          if (!partner) {
            errors.push(
              `Diesel row ${i} error: No partner found for owner ${ownerName}`
            );
            failedRows++;
            continue;
          }

          // Check if this diesel record already exists
          const dateString =
            typeof date === 'number'
              ? excelDateToDateString(date)
              : new Date(date).toISOString().split('T')[0];
          const existingDiesel = await db.query.dieselData.findFirst({
            where: and(
              eq(dieselData.date, dateString),
              eq(dieselData.vehicleNumber, vehicleNumber.toUpperCase()),
              eq(dieselData.volume, volume.toString()),
              eq(dieselData.item, item),
              eq(dieselData.fuelStation, fuelStation),
              eq(dieselData.status, status)
            ),
          });

          if (existingDiesel) {
            console.log(
              `Skipping duplicate diesel record: ${dateString} - ${vehicleNumber} - ${fuelStation}`
            );
            skippedDuplicates++;
            continue; // Skip duplicate record
          }

          // Insert diesel data
          await db.insert(dieselData).values({
            date: dateString,
            vehicleNumber: vehicleNumber.toUpperCase(),
            volume: volume,
            item: item,
            fuelStation: fuelStation,
            status: status,
            partnerId: partner.id,
          });

          successfulRows++;
        } catch (error) {
          errors.push(
            `Diesel row ${i} error: ${error instanceof Error ? error.message : 'Unknown error'}`
          );
          failedRows++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      successfulRows,
      failedRows,
      skippedDuplicates,
      newPartners,
      errors: errors.length > 0 ? errors : undefined,
      message:
        skippedDuplicates > 0
          ? `${skippedDuplicates} duplicate records were skipped to prevent duplication.`
          : undefined,
    });
  } catch (error) {
    console.error('File processing error:', error);
    return NextResponse.json(
      {
        error: `File processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 }
    );
  }
}
