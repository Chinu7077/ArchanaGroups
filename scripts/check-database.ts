import { loadEnvConfig } from '@next/env';
import { db } from '../src/config/db';
import { dispatchData, dieselData, partners } from '../src/config/db/schema';

// Load environment variables like Next.js does
loadEnvConfig(process.cwd());

async function checkDatabase() {
  try {
    console.log('🔍 Checking database contents...\n');

    // Check partners
    const allPartners = await db.query.partners.findMany();
    console.log(`👥 Partners: ${allPartners.length}`);
    allPartners.forEach(partner => {
      console.log(`  - ${partner.name} (${partner.partnerId})`);
    });

    // Check dispatch data
    const allDispatch = await db.query.dispatchData.findMany({
      orderBy: (dispatchData, { desc }) => [desc(dispatchData.createdAt)],
      limit: 10
    });
    console.log(`\n📦 Dispatch Records: ${allDispatch.length} (showing latest 10)`);
    allDispatch.forEach(dispatch => {
      console.log(`  - ${dispatch.date} | ${dispatch.vehicleNumber} | ${dispatch.material} | ${dispatch.quantity} | ${dispatch.ownerName}`);
    });

    // Check diesel data
    const allDiesel = await db.query.dieselData.findMany({
      orderBy: (dieselData, { desc }) => [desc(dieselData.createdAt)],
      limit: 10
    });
    console.log(`\n⛽ Diesel Records: ${allDiesel.length} (showing latest 10)`);
    allDiesel.forEach(diesel => {
      console.log(`  - ${diesel.date} | ${diesel.vehicleNumber} | ${diesel.volume} | ${diesel.item} | ${diesel.fuelStation}`);
    });

    console.log('\n✅ Database check complete!');

  } catch (error) {
    console.error('❌ Error checking database:', error);
  } finally {
    process.exit(0);
  }
}

checkDatabase(); 