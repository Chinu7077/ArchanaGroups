import { db } from '../src/config/db';
import { dispatchData, dieselData, partners } from '../src/config/db/schema';
import { eq } from 'drizzle-orm';

async function clearFakeData() {
  try {
    console.log('🧹 Clearing fake data from database...');

    // Find the test partner
    const testPartner = await db.query.partners.findFirst({
      where: eq(partners.partnerId, 'AG1234'),
    });

    if (!testPartner) {
      console.log('❌ Test partner not found. No data to clear.');
      return;
    }

    console.log(`✅ Found test partner: ${testPartner.name} (${testPartner.partnerId})`);

    // Clear dispatch data for this partner
    const dispatchResult = await db.delete(dispatchData).where(eq(dispatchData.partnerId, testPartner.id));
    console.log(`🗑️  Cleared ${dispatchResult.rowCount} dispatch records`);

    // Clear diesel data for this partner
    const dieselResult = await db.delete(dieselData).where(eq(dieselData.partnerId, testPartner.id));
    console.log(`🗑️  Cleared ${dieselResult.rowCount} diesel records`);

    // Optionally, you can also remove the test partner
    const partnerResult = await db.delete(partners).where(eq(partners.partnerId, 'AG1234'));
    console.log(`🗑️  Removed test partner: ${partnerResult.rowCount} record`);

    console.log('✅ All fake data has been cleared successfully!');
    console.log('📊 Database is now clean and ready for real data.');

  } catch (error) {
    console.error('❌ Error clearing fake data:', error);
  } finally {
    process.exit(0);
  }
}

clearFakeData(); 