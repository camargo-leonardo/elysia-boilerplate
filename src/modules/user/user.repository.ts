import { eq } from "drizzle-orm";
import { db } from "@/infra/db/client";
import type { UpdateUserData } from "./user.model";
import { User, users } from "../../infra/db/schema";

/**
 * User Repository
 */
export abstract class UserRepository {
  /**
   * Find user by ID
   */
  static async findById(id: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) return null;
    return user;
  }

  /**
   * Find all users
   */
  static async findAll(): Promise<User[]> {
    return await db.select().from(users);
  }

  /**
   * Update user by ID
   */
  static async updateById(
    id: string,
    data: UpdateUserData
  ): Promise<User | undefined> {
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
  static async deleteById(id: string): Promise<User | undefined> {
    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    return deletedUser;
  }
}
