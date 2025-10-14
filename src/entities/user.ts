/**
 * User entity - Domain model
 */
export interface User {
  id: string;
  email: string;
  name: string | null;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User without sensitive data (for API responses)
 */
export type PublicUser = Omit<User, "emailVerified">;

/**
 * User creation data
 */
export interface CreateUserData {
  email: string;
  name?: string | null;
  image?: string | null;
}
