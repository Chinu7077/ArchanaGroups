import { db } from '../src/config/db';
import { dispatchData, dieselData, partners } from '../src/config/db/schema';

async function checkDatabase() {
  try {
    console.log('🔍 Checking database contents...');

    // Check partners
    const allPartners = await db.query.partners.findMany();
    console.log(`👥 Partners found: ${allPartners.length}`);
    allPartners.forEach(partner => {
      console.log(`   - ${partner.name} (${partner.partnerId})`);
    });

    // Check dispatch data
    const allDispatchData = await db.query.dispatchData.findMany();
    console.log(`📦 Dispatch records found: ${allDispatchData.length}`);
    if (allDispatchData.length > 0) {
      console.log('   Sample dispatch records:');
      allDispatchData.slice(0, 3).forEach(record => {
        console.log(`   - ${record.date}: ${record.vehicleNumber} - ${record.material} - ${record.quantity} M.T`);
      });
    }

    // Check diesel data
    const allDieselData = await db.query.dieselData.findMany();
    console.log(`⛽ Diesel records found: ${allDieselData.length}`);
    if (allDieselData.length > 0) {
      console.log('   Sample diesel records:');
      allDieselData.slice(0, 3).forEach(record => {
        console.log(`   - ${record.date}: ${record.vehicleNumber} - ${record.volume} L - ${record.fuelStation}`);
      });
    }

    console.log('✅ Database check completed!');

  } catch (error) {
    console.error('❌ Error checking database:', error);
  } finally {
    process.exit(0);
  }
}

checkDatabase(); 