import { User } from "../../infra/db/schema";
import type { UpdateUserData } from "./user.model";
import { UserRepository } from "./user.repository";

/**
 * User Service
 * Following Elysia best practices: Static class for non-request-dependent logic
 */
export abstract class UserService {
  /**
   * Find user by ID
   */
  static async findById(id: string): Promise<User | null> {
    return await UserRepository.findById(id);
  }

  /**
   * Find all users
   */
  static async findAll(): Promise<User[]> {
    return await UserRepository.findAll();
  }

  /**
   * Update user by ID
   */
  static async updateById(
    id: string,
    data: UpdateUserData
  ): Promise<User | undefined> {
    return await UserRepository.updateById(id, data);
  }

  /**
   * Delete user by ID
   */
  static async deleteById(id: string): Promise<User | undefined> {
    return await UserRepository.deleteById(id);
  }
}
