#!/usr/bin/env tsx

/**
 * Partner Setup Script for ArchanaGroups
 *
 * This script creates a test partner user for login testing.
 * It creates a partner account with hashed password in the database.
 */

import * as bcrypt from 'bcryptjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { partners } from '../src/config/db/schema';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function setupPartner() {
  console.log('🚀 Starting partner setup...');

  // Validate environment variables
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL is not set in environment variables');
    process.exit(1);
  }

  try {
    // Initialize database connection
    const sql = postgres(databaseUrl);
    const db = drizzle(sql);

    console.log('✅ Connected to database');

    // Test partner credentials
    const testPartnerId = 'AG1234';
    const testPassword = 'password123';
    const testPartnerName = 'Test Partner';

    // Check if partner already exists
    const existingPartner = await db
      .select()
      .from(partners)
      .where(eq(partners.partnerId, testPartnerId))
      .limit(1);

    if (existingPartner.length > 0) {
      console.log(
        '⚠️  Partner already exists with Partner ID:',
        testPartnerId
      );
      console.log('You can use these credentials to login:');
      console.log(`   Partner ID: ${testPartnerId}`);
      console.log(`   Password: ${testPassword}`);
      await sql.end();
      return;
    }

    // Hash the password
    console.log('🔐 Hashing partner password...');
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(testPassword, saltRounds);

    // Create partner user
    console.log('👤 Creating partner user...');
    const newPartner = await db
      .insert(partners)
      .values({
        name: testPartnerName,
        partnerId: testPartnerId,
        password: hashedPassword,
        email: 'test@archanagroups.com',
        phone: '+91 9876543210',
        isActive: true,
        metadata: {
          isTestAccount: true,
          createdFor: 'testing',
        },
      })
      .returning({
        id: partners.id,
        name: partners.name,
        partnerId: partners.partnerId,
        createdAt: partners.createdAt,
      });

    console.log('✅ Partner user created successfully!');
    console.log('📋 Partner Details:');
    console.log(`   Name: ${newPartner[0].name}`);
    console.log(`   Partner ID: ${newPartner[0].partnerId}`);
    console.log(`   Created: ${newPartner[0].createdAt}`);
    console.log(`   ID: ${newPartner[0].id}`);

    console.log('\n🎉 Setup complete! You can now login with:');
    console.log(`   Partner ID: ${testPartnerId}`);
    console.log(`   Password: ${testPassword}`);
    console.log('\n🔗 Login URL: http://localhost:3000/portal');

    await sql.end();
  } catch (error) {
    console.error('❌ Error during partner setup:', error);
    process.exit(1);
  }
}

// Run the setup
setupPartner().catch((error) => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
}); 