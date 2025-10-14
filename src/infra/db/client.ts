import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Database configuration
 */
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

/**
 * PostgreSQL connection using postgres-js (Bun-compatible)
 */
export const queryClient = postgres(DATABASE_URL, {
  max: 20,
  idle_timeout: 30,
  connect_timeout: 2,
});

/**
 * Drizzle ORM instance
 */
export const db = drizzle(queryClient, { schema });

/**
 * Close database connections (useful for graceful shutdown)
 */
export async function closeDatabase(): Promise<void> {
  await queryClient.end();
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    await queryClient`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}
