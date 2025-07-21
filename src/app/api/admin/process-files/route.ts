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

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
export function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
export function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
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

    // Fetch all existing partners once
    const allPartners = await db.select().from(partners);
    const partnerNameMap = new Map(allPartners.map(p => [p.name.trim(), p]));
    const partnerIdSet = new Set(allPartners.map(p => p.partnerId));

    // For batch partner creation
    const partnersToCreate: { name: string, partnerId: string, password: string }[] = [];
    const partnerNameToId: Record<string, string> = {};

    // For batch dispatch/diesel creation
    const dispatchToInsert: any[] = [];
    const dieselToInsert: any[] = [];

    // Pre-parse files
    let dispatchRows: any[] = [];
    let dieselRows: any[] = [];
    if (dispatchFile) dispatchRows = await parseXlsxFileContent(dispatchFile);
    if (dieselFile) dieselRows = await parseXlsxFileContent(dieselFile);

    // Identify all new partners from both files
    const allOwnerNames = new Set<string>();
    for (let i = 1; i < dispatchRows.length; i++) {
      const row = dispatchRows[i];
      if (row.length < 6) continue;
      const ownerName = row[5];
      if (ownerName?.trim()) allOwnerNames.add(ownerName.trim());
    }
    for (let i = 1; i < dieselRows.length; i++) {
      const row = dieselRows[i];
      if (row.length < 7) continue;
      const ownerName = row[6];
      if (ownerName?.trim()) allOwnerNames.add(ownerName.trim());
    }
    // Find which owners are missing
    const missingOwners = Array.from(allOwnerNames).filter(name => !partnerNameMap.has(name));
    // Generate unique partner IDs and passwords
    for (const ownerName of missingOwners) {
      let partnerId = generatePartnerId(ownerName);
      let attempts = 0;
      while (partnerIdSet.has(partnerId) && attempts < 10) {
        partnerId = generatePartnerId(ownerName);
        attempts++;
      }
      if (attempts >= 10) {
        errors.push(`Failed to generate unique partner ID for ${ownerName}`);
        continue;
      }
      const password = generatePassword();
      partnersToCreate.push({ name: ownerName, partnerId, password });
      partnerNameToId[ownerName] = partnerId;
      partnerIdSet.add(partnerId);
    }
    // Batch hash passwords
    const hashedPasswords = await Promise.all(partnersToCreate.map(p => bcrypt.hash(p.password, 12)));
    // Batch insert partners
    if (partnersToCreate.length > 0) {
      const inserted = await db.insert(partners).values(partnersToCreate.map((p, i) => ({
        name: p.name,
        partnerId: p.partnerId,
        password: hashedPasswords[i],
      }))).returning();
      for (const p of inserted) {
        partnerNameMap.set(p.name.trim(), p);
        newPartners.push(p.name.trim());
      }
    }
    // Fetch all existing dispatch and diesel records for deduplication
    const allDispatch = await db.select().from(dispatchData);
    const allDiesel = await db.select().from(dieselData);
    const dispatchKeySet = new Set(allDispatch.map(d => [d.date, d.vehicleNumber, d.material, d.quantity, d.destination, d.ownerName].join('|')));
    const dieselKeySet = new Set(allDiesel.map(d => [d.date, d.vehicleNumber, d.volume, d.item, d.fuelStation, d.status].join('|')));
    // Process dispatch rows
    for (let i = 1; i < dispatchRows.length; i++) {
      const row = dispatchRows[i];
      if (row.length < 6) continue;
      const [date, vehicleNumber, material, quantity, destination, ownerName] = row;

      // Add defensive checks for required fields
      if (!date || !vehicleNumber || !material || !quantity || !destination || !ownerName) {
        failedRows++;
        errors.push(`Dispatch row ${i + 1} error: Missing required field(s)`);
        continue;
      }

      // Safely convert and validate values
      try {
        const dateString = typeof date === 'number' ? excelDateToDateString(date) : new Date(date).toISOString().split('T')[0];
        const safeVehicleNumber = String(vehicleNumber).toUpperCase();
        const safeMaterial = String(material);
        const safeQuantity = String(quantity);
        const safeDestination = String(destination);
        const safeOwnerName = String(ownerName).trim();

        if (!safeOwnerName) continue;
        const partner = partnerNameMap.get(safeOwnerName);
        if (!partner) continue;

        const key = [dateString, safeVehicleNumber, safeMaterial, safeQuantity, safeDestination, safeOwnerName].join('|');
        if (dispatchKeySet.has(key)) {
          skippedDuplicates++;
          continue;
        }

        dispatchToInsert.push({
          date: dateString,
          vehicleNumber: safeVehicleNumber,
          material: safeMaterial,
          quantity: safeQuantity,
          destination: safeDestination,
          ownerName: safeOwnerName,
          partnerId: partner.id,
        });
        dispatchKeySet.add(key);
        successfulRows++;
      } catch (error) {
        failedRows++;
        errors.push(`Dispatch row ${i + 1} error: Invalid data format - ${error.message}`);
        continue;
      }
    }

    // Process diesel rows
    for (let i = 1; i < dieselRows.length; i++) {
      const row = dieselRows[i];
      if (row.length < 7) continue;
      const [date, vehicleNumber, volume, item, fuelStation, status, ownerName] = row;

      // Add defensive checks for required fields
      if (!date || !vehicleNumber || !volume || !item || !fuelStation || !status || !ownerName) {
        failedRows++;
        errors.push(`Diesel row ${i + 1} error: Missing required field(s)`);
        continue;
      }

      // Safely convert and validate values
      try {
        const dateString = typeof date === 'number' ? excelDateToDateString(date) : new Date(date).toISOString().split('T')[0];
        const safeVehicleNumber = String(vehicleNumber).toUpperCase();
        const safeVolume = String(volume);
        const safeItem = String(item);
        const safeFuelStation = String(fuelStation);
        const safeStatus = String(status);
        const safeOwnerName = String(ownerName).trim();

        if (!safeOwnerName) continue;
        const partner = partnerNameMap.get(safeOwnerName);
        if (!partner) continue;

        const key = [dateString, safeVehicleNumber, safeVolume, safeItem, safeFuelStation, safeStatus].join('|');
        if (dieselKeySet.has(key)) {
          skippedDuplicates++;
          continue;
        }

        dieselToInsert.push({
          date: dateString,
          vehicleNumber: safeVehicleNumber,
          volume: safeVolume,
          item: safeItem,
          fuelStation: safeFuelStation,
          status: safeStatus,
          partnerId: partner.id,
        });
        dieselKeySet.add(key);
        successfulRows++;
      } catch (error) {
        failedRows++;
        errors.push(`Diesel row ${i + 1} error: Invalid data format - ${error.message}`);
        continue;
      }
    }
    // Batch insert dispatch and diesel data
    if (dispatchToInsert.length > 0) {
      await db.insert(dispatchData).values(dispatchToInsert);
    }
    if (dieselToInsert.length > 0) {
      await db.insert(dieselData).values(dieselToInsert);
    }
    return NextResponse.json({
      success: true,
      successfulRows,
      failedRows,
      skippedDuplicates,
      newPartners,
      errors: errors.length > 0 ? errors : undefined,
      message: [
        `${successfulRows} rows processed successfully`,
        failedRows > 0 ? `${failedRows} rows failed` : null,
        skippedDuplicates > 0 ? `${skippedDuplicates} duplicates skipped` : null,
        newPartners.length > 0 ? `${newPartners.length} new partners created automatically` : null,
      ].filter(Boolean).join(', ') + '.',
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
