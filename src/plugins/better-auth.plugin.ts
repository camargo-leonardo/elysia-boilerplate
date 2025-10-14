import { Elysia } from "elysia";
import { auth } from "../infra/auth";

/**
 * Type for authenticated user
 */
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Better Auth plugin for Elysia
 * Adds authentication context to routes
 * Following Elysia best practices: use .derive() to add context
 */
export const betterAuthPlugin = new Elysia({ name: "better-auth" }).derive(
  async ({ request }) => {
    // Get session from Better Auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // Return user and session to context
    return {
      user: (session?.user as AuthUser) || null,
      session: session?.session || null,
    };
  }
);

/**
 * Authentication guard decorator
 * Use this with .use() to protect routes that require authentication
 * 
 * Example:
 * new Elysia()
 *   .use(authGuard)
 *   .get('/protected', ({ user }) => user)
 */
export const authGuard = new Elysia({ name: "auth-guard" })
  .use(betterAuthPlugin)
  .onBeforeHandle(({ user, set }: any) => {
    if (!user) {
      set.status = 401;
      return {
        success: false,
        error: "Unauthorized",
        message: "Authentication required",
      };
    }
  });
