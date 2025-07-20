import * as XLSX from 'xlsx';

async function createSampleDieselFile() {
  try {
    console.log('📝 Creating sample diesel file with new format...');

    // Sample diesel data with owner name column
    const dieselData = [
      // Header row
      ['Date', 'Vehicle No', 'Volume', 'Item', 'Fuel Station', 'Status', 'Owner Name'],
      
      // Sample data rows
      ['2025-01-15', 'OD01AB1234', '150', 'Diesel', 'HP Petrol Pump, Bhubaneswar', 'completed', 'Test Partner'],
      ['2025-01-16', 'OD02CD5678', '200', 'Diesel', 'BP Fuel Station, Cuttack', 'completed', 'Test Partner'],
      ['2025-01-17', 'OD03EF9012', '120', 'Diesel', 'Shell Petrol Pump, Puri', 'completed', 'Test Partner'],
      ['2025-01-18', 'OD04GH3456', '180', 'Diesel', 'IOC Petrol Pump, Berhampur', 'completed', 'Test Partner'],
      ['2025-01-19', 'OD05IJ7890', '160', 'Diesel', 'HP Petrol Pump, Angul', 'completed', 'Test Partner'],
    ];

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(dieselData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Diesel Data');

    // Write to file
    XLSX.writeFile(workbook, 'sample-diesel-data.xlsx');

    console.log('✅ Sample diesel file created: sample-diesel-data.xlsx');
    console.log('📋 File format:');
    console.log('   - Date: YYYY-MM-DD format');
    console.log('   - Vehicle No: Vehicle registration number');
    console.log('   - Volume: Fuel volume in liters');
    console.log('   - Item: Type of fuel (usually Diesel)');
    console.log('   - Fuel Station: Name and location of fuel station');
    console.log('   - Status: completed, pending, etc.');
    console.log('   - Owner Name: Must match existing partner name in system');
    console.log('');
    console.log('💡 Note: The Owner Name column must match exactly with a partner name that already exists in the system.');

  } catch (error) {
    console.error('❌ Error creating sample file:', error);
  } finally {
    process.exit(0);
  }
}

createSampleDieselFile(); 