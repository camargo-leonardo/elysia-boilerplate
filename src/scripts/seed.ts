#!/usr/bin/env bun

/**
 * Script to seed the database with initial data
 * Run with: bun run src/scripts/seed.ts
 */

import { db } from "../infra/db/client";
import { users } from "../infra/db/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Example: Create a test user
    const testUser = {
      id: crypto.randomUUID(),
      email: "admin@example.com",
      name: "Admin User",
      emailVerified: true,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(users).values(testUser).onConflictDoNothing();

    console.log("✅ Database seeded successfully!");
    console.log("Test user created:", testUser.email);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
