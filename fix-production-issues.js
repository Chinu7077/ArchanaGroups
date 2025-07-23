const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

async function fixProductionIssues() {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    console.log('🔧 FIXING PRODUCTION ISSUES\n');
    console.log('Database URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');
    
    // 1. Check if support_queries table exists in production
    console.log('1️⃣ Checking support_queries table in production...');
    try {
      const tableExists = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'support_queries'
        );
      `;
      
      if (tableExists[0].exists) {
        console.log('   ✅ support_queries table exists');
        
        // Check table structure
        const columns = await sql`
          SELECT column_name, data_type, column_default 
          FROM information_schema.columns 
          WHERE table_name = 'support_queries' 
          ORDER BY ordinal_position;
        `;
        console.log('   📋 Table structure:');
        columns.forEach(col => {
          console.log(`      - ${col.column_name}: ${col.data_type} (default: ${col.column_default || 'none'})`);
        });
      } else {
        console.log('   ❌ support_queries table does NOT exist in production');
        console.log('   🔧 Creating support_queries table...');
        
        await sql`
          CREATE TABLE support_queries (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            priority TEXT NOT NULL DEFAULT 'normal',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            resolved_at TIMESTAMP WITH TIME ZONE,
            response TEXT
          );
        `;
        console.log('   ✅ support_queries table created successfully');
      }
    } catch (error) {
      console.log('   ❌ Error checking support_queries table:', error.message);
    }
    
    // 2. Check diesel_data and dispatch_data table structures
    console.log('\n2️⃣ Checking data table structures...');
    
    try {
      const dieselColumns = await sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'diesel_data' 
        AND column_name IN ('volume', 'quantity');
      `;
      
      const dispatchColumns = await sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'dispatch_data' 
        AND column_name IN ('volume', 'quantity');
      `;
      
      console.log('   Diesel data columns:');
      dieselColumns.forEach(col => {
        console.log(`      - ${col.column_name}: ${col.data_type}`);
      });
      
      console.log('   Dispatch data columns:');
      dispatchColumns.forEach(col => {
        console.log(`      - ${col.column_name}: ${col.data_type}`);
      });
      
      // Check if we need to convert decimal to text
      const needsVolumeConversion = dieselColumns.find(col => 
        col.column_name === 'volume' && col.data_type.includes('numeric')
      );
      
      const needsQuantityConversion = dispatchColumns.find(col => 
        col.column_name === 'quantity' && col.data_type.includes('numeric')
      );
      
      if (needsVolumeConversion) {
        console.log('   🔧 Converting diesel volume from numeric to text...');
        await sql`ALTER TABLE diesel_data ALTER COLUMN volume TYPE TEXT;`;
        console.log('   ✅ Diesel volume converted to text');
      }
      
      if (needsQuantityConversion) {
        console.log('   🔧 Converting dispatch quantity from numeric to text...');
        await sql`ALTER TABLE dispatch_data ALTER COLUMN quantity TYPE TEXT;`;
        console.log('   ✅ Dispatch quantity converted to text');
      }
      
    } catch (error) {
      console.log('   ❌ Error checking data table structures:', error.message);
    }
    
    // 3. Test support query functionality
    console.log('\n3️⃣ Testing support query functionality...');
    
    try {
      const partners = await sql`SELECT id, name FROM partners LIMIT 1;`;
      
      if (partners.length > 0) {
        const partnerId = partners[0].id;
        
        // Test insert
        const testQuery = await sql`
          INSERT INTO support_queries (partner_id, subject, message, status, priority)
          VALUES (${partnerId}, 'Production Test', 'Testing production deployment', 'pending', 'normal')
          RETURNING id, subject, status, created_at;
        `;
        console.log('   ✅ Support query insert test successful:', testQuery[0]);
        
        // Test select with joins
        const queryWithPartner = await sql`
          SELECT sq.id, sq.subject, sq.status, p.name as partner_name
          FROM support_queries sq
          LEFT JOIN partners p ON sq.partner_id = p.id
          WHERE sq.id = ${testQuery[0].id};
        `;
        console.log('   ✅ Support query join test successful:', queryWithPartner[0]);
        
        // Clean up test data
        await sql`DELETE FROM support_queries WHERE id = ${testQuery[0].id};`;
        console.log('   🧹 Test data cleaned up');
        
      } else {
        console.log('   ⚠️  No partners found to test with');
      }
    } catch (error) {
      console.log('   ❌ Support query test failed:', error.message);
    }
    
    // 4. Check current data counts
    console.log('\n4️⃣ Checking current data counts...');
    
    try {
      const counts = await sql`
        SELECT 
          (SELECT COUNT(*) FROM partners) as partners,
          (SELECT COUNT(*) FROM diesel_data) as diesel_data,
          (SELECT COUNT(*) FROM dispatch_data) as dispatch_data,
          (SELECT COUNT(*) FROM support_queries) as support_queries;
      `;
      
      console.log('   📊 Current data counts:');
      console.log(`      - Partners: ${counts[0].partners}`);
      console.log(`      - Diesel Data: ${counts[0].diesel_data}`);
      console.log(`      - Dispatch Data: ${counts[0].dispatch_data}`);
      console.log(`      - Support Queries: ${counts[0].support_queries}`);
      
    } catch (error) {
      console.log('   ❌ Error getting data counts:', error.message);
    }
    
    // 5. Test SUM functions with CAST
    console.log('\n5️⃣ Testing SUM functions with CAST...');
    
    try {
      if (await sql`SELECT COUNT(*) as count FROM diesel_data;`.then(r => r[0].count > 0)) {
        const dieselSum = await sql`
          SELECT COALESCE(SUM(CAST(volume AS NUMERIC)), 0) as total_volume
          FROM diesel_data;
        `;
        console.log('   ✅ Diesel SUM test successful, total volume:', dieselSum[0].total_volume);
      } else {
        console.log('   ℹ️  No diesel data to test SUM function');
      }
      
      if (await sql`SELECT COUNT(*) as count FROM dispatch_data;`.then(r => r[0].count > 0)) {
        const dispatchSum = await sql`
          SELECT COALESCE(SUM(CAST(quantity AS NUMERIC)), 0) as total_quantity
          FROM dispatch_data;
        `;
        console.log('   ✅ Dispatch SUM test successful, total quantity:', dispatchSum[0].total_quantity);
      } else {
        console.log('   ℹ️  No dispatch data to test SUM function');
      }
      
    } catch (error) {
      console.log('   ❌ SUM function test failed:', error.message);
    }
    
    console.log('\n✅ PRODUCTION FIXES COMPLETED!');
    console.log('\n📋 NEXT STEPS:');
    console.log('1. Redeploy your application (Vercel/Netlify/etc.)');
    console.log('2. Clear any application caches');
    console.log('3. Test support query submission');
    console.log('4. Test diesel file upload');
    
  } catch (error) {
    console.error('❌ Fatal Error:', error);
  }
}

fixProductionIssues(); 