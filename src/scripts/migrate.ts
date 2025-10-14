import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

/**
 * Run database migrations
 */
async function runMigrations() {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL)
    throw new Error("DATABASE_URL environment variable is not set");

  console.log("Running database migrations...");

  // Create migration client (max 1 connection for migrations)
  const migrationClient = postgres(DATABASE_URL, { max: 1 });
  const db = drizzle(migrationClient);

  try {
    await migrate(db, { migrationsFolder: "./drizzle/migrations" });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    await migrationClient.end();
  }
}

runMigrations()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
