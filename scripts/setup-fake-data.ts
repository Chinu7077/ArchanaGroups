import { db } from '../src/config/db';
import { dispatchData, dieselData, partners } from '../src/config/db/schema';
import { eq } from 'drizzle-orm';

async function setupFakeData() {
  try {
    console.log('🚀 Setting up fake data for partner dashboard...');

    // First, let's get the test partner ID
    const testPartner = await db.query.partners.findFirst({
      where: eq(partners.partnerId, 'AG1234'),
    });

    if (!testPartner) {
      console.log('❌ Test partner not found. Please run setup-partner.ts first.');
      return;
    }

    console.log(`✅ Found test partner: ${testPartner.name} (${testPartner.partnerId})`);

    // Clear existing data for this partner
    await db.delete(dispatchData).where(eq(dispatchData.partnerId, testPartner.id));
    await db.delete(dieselData).where(eq(dieselData.partnerId, testPartner.id));

    console.log('🧹 Cleared existing data for test partner');

    // Sample dispatch data for current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const dispatchDataToInsert = [
      // First half of month (1-15)
      {
        date: new Date(currentYear, currentMonth, 2),
        vehicleNumber: 'OD-01-AB-1234',
        material: 'Coal',
        quantity: '25.500',
        destination: 'Bhubaneswar Power Plant',
        ownerName: testPartner.name,
        partnerId: testPartner.id,
        driverName: 'Rajesh Kumar',
        driverPhone: '9876543210',
        status: 'delivered',
        notes: 'On-time delivery',
      },
      {
        date: new Date(currentYear, currentMonth, 5),
        vehicleNumber: 'OD-02-CD-5678',
        material: 'Iron Ore',
        quantity: '30.250',
        destination: 'Jamshedpur Steel Plant',
        ownerName: testPartner.name,
        partnerId: testPartner.id,
        driverName: 'Amit Singh',
        driverPhone: '9876543211',
        status: 'delivered',
        notes: 'Good quality material',
      },
      {
        date: new Date(currentYear, currentMonth, 8),
        vehicleNumber: 'OD-03-EF-9012',
        material: 'Limestone',
        quantity: '22.750',
        destination: 'Cement Factory, Cuttack',
        ownerName: testPartner.name,
        partnerId: testPartner.id,
        driverName: 'Suresh Patel',
        driverPhone: '9876543212',
        status: 'in_transit',
        notes: 'En route to destination',
      },
      {
        date: new Date(currentYear, currentMonth, 12),
        vehicleNumber: 'OD-04-GH-3456',
        material: 'Sand',
        quantity: '18.000',
        destination: 'Construction Site, Puri',
        ownerName: testPartner.name,
        partnerId: testPartner.id,
        driverName: 'Mohan Das',
        driverPhone: '9876543213',
        status: 'delivered',
        notes: 'Construction material delivered',
      },
      {
        date: new Date(currentYear, currentMonth, 15),
        vehicleNumber: 'OD-05-IJ-7890',
        material: 'Gravel',
        quantity: '28.500',
        destination: 'Road Construction, Berhampur',
        ownerName: testPartner.name,
        partnerId: testPartner.id,
        driverName: 'Ramesh Yadav',
        driverPhone: '9876543214',
        status: 'pending',
        notes: 'Scheduled for loading',
      },
      // Second half of month (16-31)
      {
        date: new Date(currentYear, currentMonth, 17),
        vehicleNumber: 'OD-06-KL-1234',
        material: 'Coal',
        quantity: '32.000',
        destination: 'Thermal Power Station, Angul',
        ownerName: testPartner.name,
        partnerId: testPartner.id,
        driverName: 'Vikram Singh',
        driverPhone: '9876543215',
        status: 'delivered',
        notes: 'Power plant supply',
      },
      {
        date: new Date(currentYear, currentMonth, 20),
        vehicleNumber: 'OD-07-MN-5678',
        material: 'Iron Ore',
        quantity: '27.750',
        destination: 'Steel Plant, Rourkela',
        ownerName: testPartner.name,
        partnerId: testPartner.id,
        driverName: 'Anil Kumar',
        driverPhone: '9876543216',
        status: 'in_transit',
        notes: 'Heavy load transport',
      },
      {
        date: new Date(currentYear, currentMonth, 23),
        vehicleNumber: 'OD-08-OP-9012',
        material: 'Limestone',
        quantity: '24.250',
        destination: 'Cement Factory, Balasore',
        ownerName: testPartner.name,
        partnerId: testPartner.id,
        driverName: 'Prakash Sharma',
        driverPhone: '9876543217',
        status: 'delivered',
        notes: 'Cement production material',
      },
      {
        date: new Date(currentYear, currentMonth, 26),
        vehicleNumber: 'OD-09-QR-3456',
        material: 'Sand',
        quantity: '19.500',
        destination: 'Beach Resort Construction, Konark',
        ownerName: testPartner.name,
        partnerId: testPartner.id,
        driverName: 'Dinesh Verma',
        driverPhone: '9876543218',
        status: 'delivered',
        notes: 'Tourism project material',
      },
      {
        date: new Date(currentYear, currentMonth, 29),
        vehicleNumber: 'OD-10-ST-7890',
        material: 'Gravel',
        quantity: '31.000',
        destination: 'Highway Construction, Sambalpur',
        ownerName: testPartner.name,
        partnerId: testPartner.id,
        driverName: 'Harish Mehta',
        driverPhone: '9876543219',
        status: 'pending',
        notes: 'Infrastructure development',
      },
    ];

    // Sample diesel data for current month
    const dieselDataToInsert = [
      // First half of month (1-15)
      {
        date: new Date(currentYear, currentMonth, 1),
        vehicleNumber: 'OD-01-AB-1234',
        volume: '150.000',
        item: 'Diesel',
        fuelStation: 'HP Petrol Pump, Bhubaneswar',
        status: 'completed',
        partnerId: testPartner.id,
        pricePerLiter: '95.50',
        totalAmount: 14325.00,
        driverName: 'Rajesh Kumar',
        fuelType: 'diesel',
        odometer: 125000,
        billNumber: 'HP001234',
        notes: 'Regular refueling',
      },
      {
        date: new Date(currentYear, currentMonth, 4),
        vehicleNumber: 'OD-02-CD-5678',
        volume: '200.000',
        item: 'Diesel',
        fuelStation: 'BP Fuel Station, Cuttack',
        status: 'completed',
        partnerId: testPartner.id,
        pricePerLiter: '96.00',
        totalAmount: 19200.00,
        driverName: 'Amit Singh',
        fuelType: 'diesel',
        odometer: 89000,
        billNumber: 'BP005678',
        notes: 'Long distance trip fuel',
      },
      {
        date: new Date(currentYear, currentMonth, 7),
        vehicleNumber: 'OD-03-EF-9012',
        volume: '120.000',
        item: 'Diesel',
        fuelStation: 'Shell Petrol Pump, Puri',
        status: 'completed',
        partnerId: testPartner.id,
        pricePerLiter: '94.75',
        totalAmount: 11370.00,
        driverName: 'Suresh Patel',
        fuelType: 'diesel',
        odometer: 156000,
        billNumber: 'SH009012',
        notes: 'Local delivery fuel',
      },
      {
        date: new Date(currentYear, currentMonth, 10),
        vehicleNumber: 'OD-04-GH-3456',
        volume: '180.000',
        item: 'Diesel',
        fuelStation: 'IOC Petrol Pump, Berhampur',
        status: 'completed',
        partnerId: testPartner.id,
        pricePerLiter: '95.25',
        totalAmount: 17145.00,
        driverName: 'Mohan Das',
        fuelType: 'diesel',
        odometer: 112000,
        billNumber: 'IOC003456',
        notes: 'Construction site fuel',
      },
      {
        date: new Date(currentYear, currentMonth, 13),
        vehicleNumber: 'OD-05-IJ-7890',
        volume: '160.000',
        item: 'Diesel',
        fuelStation: 'HP Petrol Pump, Angul',
        status: 'completed',
        partnerId: testPartner.id,
        pricePerLiter: '96.50',
        totalAmount: 15440.00,
        driverName: 'Ramesh Yadav',
        fuelType: 'diesel',
        odometer: 78000,
        billNumber: 'HP007890',
        notes: 'Power plant delivery fuel',
      },
      // Second half of month (16-31)
      {
        date: new Date(currentYear, currentMonth, 16),
        vehicleNumber: 'OD-06-KL-1234',
        volume: '220.000',
        item: 'Diesel',
        fuelStation: 'BP Fuel Station, Rourkela',
        status: 'completed',
        partnerId: testPartner.id,
        pricePerLiter: '97.00',
        totalAmount: 21340.00,
        driverName: 'Vikram Singh',
        fuelType: 'diesel',
        odometer: 134000,
        billNumber: 'BP012345',
        notes: 'Heavy load transport fuel',
      },
      {
        date: new Date(currentYear, currentMonth, 19),
        vehicleNumber: 'OD-07-MN-5678',
        volume: '190.000',
        item: 'Diesel',
        fuelStation: 'Shell Petrol Pump, Balasore',
        status: 'completed',
        partnerId: testPartner.id,
        pricePerLiter: '95.75',
        totalAmount: 18192.50,
        driverName: 'Anil Kumar',
        fuelType: 'diesel',
        odometer: 167000,
        billNumber: 'SH056789',
        notes: 'Steel plant delivery',
      },
      {
        date: new Date(currentYear, currentMonth, 22),
        vehicleNumber: 'OD-08-OP-9012',
        volume: '140.000',
        item: 'Diesel',
        fuelStation: 'IOC Petrol Pump, Konark',
        status: 'completed',
        partnerId: testPartner.id,
        pricePerLiter: '94.50',
        totalAmount: 13230.00,
        driverName: 'Prakash Sharma',
        fuelType: 'diesel',
        odometer: 145000,
        billNumber: 'IOC009012',
        notes: 'Cement factory supply',
      },
      {
        date: new Date(currentYear, currentMonth, 25),
        vehicleNumber: 'OD-09-QR-3456',
        volume: '170.000',
        item: 'Diesel',
        fuelStation: 'HP Petrol Pump, Sambalpur',
        status: 'completed',
        partnerId: testPartner.id,
        pricePerLiter: '96.25',
        totalAmount: 16362.50,
        driverName: 'Dinesh Verma',
        fuelType: 'diesel',
        odometer: 98000,
        billNumber: 'HP034567',
        notes: 'Tourism project fuel',
      },
      {
        date: new Date(currentYear, currentMonth, 28),
        vehicleNumber: 'OD-10-ST-7890',
        volume: '210.000',
        item: 'Diesel',
        fuelStation: 'BP Fuel Station, Bhubaneswar',
        status: 'completed',
        partnerId: testPartner.id,
        pricePerLiter: '97.50',
        totalAmount: 20475.00,
        driverName: 'Harish Mehta',
        fuelType: 'diesel',
        odometer: 123000,
        billNumber: 'BP078901',
        notes: 'Highway construction fuel',
      },
    ];

    // Insert dispatch data
    console.log('📦 Inserting dispatch data...');
    for (const data of dispatchDataToInsert) {
      await db.insert(dispatchData).values(data);
    }

    // Insert diesel data
    console.log('⛽ Inserting diesel data...');
    for (const data of dieselDataToInsert) {
      await db.insert(dieselData).values(data);
    }

    console.log('✅ Fake data setup completed successfully!');
    console.log(`📊 Added ${dispatchDataToInsert.length} dispatch records`);
    console.log(`⛽ Added ${dieselDataToInsert.length} diesel records`);
    console.log(`👤 Partner: ${testPartner.name} (${testPartner.partnerId})`);
    console.log(`📅 Data covers: ${new Date(currentYear, currentMonth, 1).toLocaleDateString()} to ${new Date(currentYear, currentMonth + 1, 0).toLocaleDateString()}`);

  } catch (error) {
    console.error('❌ Error setting up fake data:', error);
  } finally {
    process.exit(0);
  }
}

setupFakeData(); 