import { config } from 'dotenv';
config({ path: '.env.local' });
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/config/db/schema.ts',
  out: './src/config/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
  // Enhanced configuration for better performance
  introspect: {
    casing: 'camel',
  },
  // Migration configuration
  migrations: {
    prefix: 'timestamp',
    table: '__drizzle_migrations__',
    schema: 'public',
  },
  // Enable modern features
  extensionsFilters: ['postgis'],
  // Better schema management
  schemaFilter: ['public'],
  tablesFilter: '*',
  // Performance improvements
  breakpoints: true,
});
