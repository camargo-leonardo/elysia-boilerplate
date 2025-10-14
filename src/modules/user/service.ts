import { eq } from "drizzle-orm";
import type { UpdateUserData } from "./model";
import { users } from "../../infra/db/schema";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

/**
 * User Service
 * Following Elysia best practices: Static class for non-request-dependent logic
 */
export abstract class UserService {
  /**
   * Find user by ID
   */
  static async findById(db: PostgresJsDatabase<any>, id: string) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) return null;
    return user;
  }

  /**
   * Find all users
   */
  static async findAll(db: PostgresJsDatabase<any>) {
    return await db.select().from(users);
  }

  /**
   * Update user by ID
   */
  static async updateById(
    db: PostgresJsDatabase<any>,
    id: string,
    data: UpdateUserData
  ) {
    const [updatedUser] = await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    return updatedUser;
  }

  /**
   * Delete user by ID
   */
  static async deleteById(db: PostgresJsDatabase<any>, id: string) {
    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    return deletedUser;
  }
}
