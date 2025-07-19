#!/usr/bin/env tsx

/**
 * Admin Setup Script for ArchanaGroups
 *
 * This script creates the initial admin user for first-time setup.
 * It reads admin credentials from environment variables and creates
 * a hashed password entry in the database.
 */

import * as bcrypt from 'bcryptjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { admins } from '../src/config/db/schema';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function setupAdmin() {
  console.log('🚀 Starting admin setup...');

  // Validate environment variables
  const databaseUrl = process.env.DATABASE_URL;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL is not set in environment variables');
    process.exit(1);
  }

  if (!adminUsername) {
    console.error('❌ ADMIN_USERNAME is not set in environment variables');
    process.exit(1);
  }

  if (!adminPassword) {
    console.error('❌ ADMIN_PASSWORD is not set in environment variables');
    process.exit(1);
  }

  try {
    // Initialize database connection
    const sql = postgres(databaseUrl);
    const db = drizzle(sql);

    console.log('✅ Connected to database');

    // Check if admin already exists
    const existingAdmin = await db
      .select()
      .from(admins)
      .where(eq(admins.username, adminUsername))
      .limit(1);

    if (existingAdmin.length > 0) {
      console.log(
        '⚠️  Admin user already exists with username:',
        adminUsername
      );
      console.log(
        'If you want to reset the password, delete the existing admin first.'
      );
      await sql.end();
      return;
    }

    // Hash the password
    console.log('🔐 Hashing admin password...');
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    // Create admin user
    console.log('👤 Creating admin user...');
    const newAdmin = await db
      .insert(admins)
      .values({
        username: adminUsername,
        password: hashedPassword,
        fullName: 'System Administrator',
        role: 'admin',
        isActive: true,
        permissions: {
          canManagePartners: true,
          canViewReports: true,
          canManageAdmins: false, // First admin cannot manage other admins by default
        },
      })
      .returning({
        id: admins.id,
        username: admins.username,
        role: admins.role,
        createdAt: admins.createdAt,
      });

    console.log('✅ Admin user created successfully!');
    console.log('📋 Admin Details:');
    console.log(`   Username: ${newAdmin[0].username}`);
    console.log(`   Role: ${newAdmin[0].role}`);
    console.log(`   Created: ${newAdmin[0].createdAt}`);
    console.log(`   ID: ${newAdmin[0].id}`);

    console.log('\n🎉 Setup complete! You can now login with:');
    console.log(`   Username: ${adminUsername}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(
      '\n⚠️  Remember to change the default password after first login!'
    );

    await sql.end();
  } catch (error) {
    console.error('❌ Error during admin setup:', error);
    process.exit(1);
  }
}

// Run the setup
setupAdmin().catch((error) => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
});
