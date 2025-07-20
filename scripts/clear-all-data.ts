import { loadEnvConfig } from '@next/env';

// Load environment variables like Next.js does
loadEnvConfig(process.cwd());

import { db } from '../src/config/db';
import { dispatchData, dieselData } from '../src/config/db/schema';

async function clearAllData() {
  try {
    console.log('🧹 Clearing ALL data from database...');

    // Clear all dispatch data
    const dispatchResult = await db.delete(dispatchData);
    console.log(`🗑️  Cleared ${dispatchResult.rowCount} dispatch records`);

    // Clear all diesel data
    const dieselResult = await db.delete(dieselData);
    console.log(`🗑️  Cleared ${dieselResult.rowCount} diesel records`);

    console.log('✅ All data has been cleared successfully!');
    console.log('📊 Database is now clean and ready for new uploads.');
    console.log('💡 You can now upload your files again without duplicate errors.');

  } catch (error) {
    console.error('❌ Error clearing data:', error);
  } finally {
    process.exit(0);
  }
}

clearAllData(); 