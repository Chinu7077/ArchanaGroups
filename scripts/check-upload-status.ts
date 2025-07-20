import { db } from '../src/config/db';
import { partners, dispatchData, dieselData } from '../src/config/db/schema';
import { desc, count } from 'drizzle-orm';

async function checkUploadStatus() {
  console.log('📊 Checking current upload status...\n');

  try {
    // Get total counts
    const [partnersCount] = await db.select({ count: count() }).from(partners);
    const [dispatchCount] = await db.select({ count: count() }).from(dispatchData);
    const [dieselCount] = await db.select({ count: count() }).from(dieselData);

    console.log('📈 Database Summary:');
    console.log(`   👥 Total Partners: ${partnersCount.count}`);
    console.log(`   🚛 Total Dispatch Records: ${dispatchCount.count}`);
    console.log(`   ⛽ Total Diesel Records: ${dieselCount.count}\n`);

    // Get recent data (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentDispatch = await db.select({ count: count() })
      .from(dispatchData)
      .where(dispatchData.date >= sevenDaysAgo.toISOString().split('T')[0]);

    const recentDiesel = await db.select({ count: count() })
      .from(dieselData)
      .where(dieselData.date >= sevenDaysAgo.toISOString().split('T')[0]);

    console.log('📅 Recent Activity (Last 7 days):');
    console.log(`   🚛 Recent Dispatch Records: ${recentDispatch[0].count}`);
    console.log(`   ⛽ Recent Diesel Records: ${recentDiesel[0].count}\n`);

    // Get partners with only diesel data (no dispatch data)
    const partnersWithOnlyDiesel = await db
      .select({
        partnerName: partners.name,
        partnerId: partners.partnerId,
        dieselCount: count(dieselData.id),
        dispatchCount: count(dispatchData.id),
      })
      .from(partners)
      .leftJoin(dieselData, dieselData.partnerId === partners.id)
      .leftJoin(dispatchData, dispatchData.partnerId === partners.id)
      .groupBy(partners.id, partners.name, partners.partnerId)
      .having(count(dispatchData.id) === 0);

    if (partnersWithOnlyDiesel.length > 0) {
      console.log('👥 Partners with Only Diesel Data (No Dispatch):');
      partnersWithOnlyDiesel.forEach(partner => {
        console.log(`   📋 ${partner.partnerName} (ID: ${partner.partnerId}) - ${partner.dieselCount} diesel records`);
      });
      console.log('');
    }

    // Get partners with only dispatch data (no diesel data)
    const partnersWithOnlyDispatch = await db
      .select({
        partnerName: partners.name,
        partnerId: partners.partnerId,
        dieselCount: count(dieselData.id),
        dispatchCount: count(dispatchData.id),
      })
      .from(partners)
      .leftJoin(dieselData, dieselData.partnerId === partners.id)
      .leftJoin(dispatchData, dispatchData.partnerId === partners.id)
      .groupBy(partners.id, partners.name, partners.partnerId)
      .having(count(dieselData.id) === 0);

    if (partnersWithOnlyDispatch.length > 0) {
      console.log('👥 Partners with Only Dispatch Data (No Diesel):');
      partnersWithOnlyDispatch.forEach(partner => {
        console.log(`   📋 ${partner.partnerName} (ID: ${partner.partnerId}) - ${partner.dispatchCount} dispatch records`);
      });
      console.log('');
    }

    // Get partners with both types of data
    const partnersWithBoth = await db
      .select({
        partnerName: partners.name,
        partnerId: partners.partnerId,
        dieselCount: count(dieselData.id),
        dispatchCount: count(dispatchData.id),
      })
      .from(partners)
      .leftJoin(dieselData, dieselData.partnerId === partners.id)
      .leftJoin(dispatchData, dispatchData.partnerId === partners.id)
      .groupBy(partners.id, partners.name, partners.partnerId)
      .having(count(dieselData.id) > 0 && count(dispatchData.id) > 0);

    if (partnersWithBoth.length > 0) {
      console.log('👥 Partners with Both Dispatch and Diesel Data:');
      partnersWithBoth.forEach(partner => {
        console.log(`   📋 ${partner.partnerName} (ID: ${partner.partnerId}) - ${partner.dispatchCount} dispatch, ${partner.dieselCount} diesel`);
      });
      console.log('');
    }

    console.log('💡 Upload Tips:');
    console.log('   • Diesel files can be uploaded independently');
    console.log('   • New owners will be created automatically');
    console.log('   • Duplicate records are automatically skipped');
    console.log('   • Daily or 2-3 day gap uploads work perfectly');

  } catch (error) {
    console.error('❌ Error checking status:', error);
  }
}

checkUploadStatus()
  .then(() => {
    console.log('✅ Status check completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Status check failed:', error);
    process.exit(1);
  }); 