import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create the Neon HTTP client for better edge/serverless performance
const sql = neon(process.env.DATABASE_URL);

// Create the database instance with schema using modern syntax
export const db = drizzle(sql, {
  schema,
  logger: process.env.NODE_ENV === 'development',
});

// Enhanced error handling wrapper for database operations
export async function withDbErrorHandling<T>(
  operation: () => Promise<T>,
  context?: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    // Enhanced error logging with context
    console.error(
      `Database operation failed${context ? ` in ${context}` : ''}:`,
      {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
        context,
      }
    );

    // Re-throw with enhanced error message
    if (error instanceof Error) {
      throw new Error(
        `Database operation failed${context ? ` in ${context}` : ''}: ${error.message}`
      );
    }
    throw error;
  }
}

// Utility function for transaction handling with proper error management
export async function withTransaction<T>(
  callback: Parameters<typeof db.transaction>[0]
): Promise<T> {
  return withDbErrorHandling(
    () => db.transaction(callback) as Promise<T>,
    'transaction'
  );
}

// Export all schema items for easy access
export * from './schema';
