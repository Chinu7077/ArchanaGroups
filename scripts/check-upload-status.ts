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

    // Get all partners with their data counts
    const allPartners = await db.select({
      id: partners.id,
      name: partners.name,
      partnerId: partners.partnerId,
    }).from(partners);

    if (allPartners.length > 0) {
      console.log('👥 All Partners:');
      for (const partner of allPartners) {
        // Get diesel count for this partner
        const [dieselCount] = await db.select({ count: count() })
          .from(dieselData)
          .where(dieselData.partnerId === partner.id);

        // Get dispatch count for this partner
        const [dispatchCount] = await db.select({ count: count() })
          .from(dispatchData)
          .where(dispatchData.partnerId === partner.id);

        const dieselRecords = dieselCount.count;
        const dispatchRecords = dispatchCount.count;

        if (dieselRecords > 0 && dispatchRecords === 0) {
          console.log(`   📋 ${partner.name} (ID: ${partner.partnerId}) - ${dieselRecords} diesel records only`);
        } else if (dispatchRecords > 0 && dieselRecords === 0) {
          console.log(`   📋 ${partner.name} (ID: ${partner.partnerId}) - ${dispatchRecords} dispatch records only`);
        } else if (dieselRecords > 0 && dispatchRecords > 0) {
          console.log(`   📋 ${partner.name} (ID: ${partner.partnerId}) - ${dispatchRecords} dispatch, ${dieselRecords} diesel`);
        } else {
          console.log(`   📋 ${partner.name} (ID: ${partner.partnerId}) - no data yet`);
        }
      }
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