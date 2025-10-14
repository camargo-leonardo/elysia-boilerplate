import { Elysia, t } from "elysia";

/**
 * User Models (DTOs)
 * Following Elysia best practices: use Elysia.t instead of classes/interfaces
 */
export const UserModels = new Elysia({ name: "User.Models" }).model({
  // Update user body
  "user.update": t.Partial(
    t.Object({
      name: t.String({ minLength: 1 }),
      email: t.String({ format: "email" }),
    })
  ),

  // User response
  "user.response": t.Object({
    id: t.String(),
    email: t.String(),
    name: t.Nullable(t.String()),
    emailVerified: t.Boolean(),
    image: t.Nullable(t.String()),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  }),

  // User list response
  "user.list": t.Object({
    success: t.Boolean(),
    data: t.Array(t.Ref("user.response")),
  }),

  // User single response
  "user.single": t.Object({
    success: t.Boolean(),
    data: t.Ref("user.response"),
  }),

  // Error response
  "user.error": t.Object({
    success: t.Literal(false),
    error: t.String(),
    message: t.Optional(t.String()),
  }),
});

// Export types (Static inference from Elysia.t)
export type UpdateUserData = {
  name?: string;
  email?: string;
};

export type UserResponse = {
  id: string;
  email: string;
  name: string | null;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};
