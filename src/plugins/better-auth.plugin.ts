import { Elysia } from "elysia";
import { auth } from "../infra/auth";

/**
 * Type for authenticated user
 */
export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
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

/**
 * Type helper for authenticated context
 * Use this to type your handler parameters
 */
export type AuthenticatedHandler<T = any> = (context: {
  user: AuthUser;
  body: T;
  query: Record<string, string>;
  params: Record<string, string>;
  headers: Record<string, string | undefined>;
  set: any;
  request: Request;
  store: any;
}) => any;

/**
 * Helper to create type-safe authenticated handlers
 *
 * Example:
 * .get("/protected", withAuth(({ user }) => {
 *   return { id: user.id }; // user is properly typed!
 * }))
 */
export const withAuth = <T = any>(
  handler: (context: {
    user: AuthUser;
    body: T;
    query: Record<string, string>;
    params: Record<string, string>;
    headers: Record<string, string | undefined>;
    set: any;
    request: Request;
    store: any;
  }) => any
) => handler as any;
