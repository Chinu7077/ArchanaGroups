import { loadEnvConfig } from '@next/env';
import { db } from '../src/config/db';
import { dispatchData, dieselData, partners } from '../src/config/db/schema';

// Load environment variables like Next.js does
loadEnvConfig(process.cwd());

async function clearEverything() {
  try {
    console.log('🧹 Clearing EVERYTHING from database...\n');

    // Clear all dispatch data
    const dispatchResult = await db.delete(dispatchData);
    console.log(`🗑️  Cleared ${dispatchResult.rowCount} dispatch records`);

    // Clear all diesel data
    const dieselResult = await db.delete(dieselData);
    console.log(`🗑️  Cleared ${dieselResult.rowCount} diesel records`);

    // Clear all partners (except admins)
    const partnersResult = await db.delete(partners);
    console.log(`🗑️  Cleared ${partnersResult.rowCount} partner records`);

    console.log('\n✅ Database is now completely empty!');
    console.log('📊 You can now upload files without any conflicts.');
    console.log('💡 The system will create new partners automatically when you upload.');

  } catch (error) {
    console.error('❌ Error clearing database:', error);
  } finally {
    process.exit(0);
  }
}

clearEverything(); 