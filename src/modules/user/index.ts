import { Elysia } from "elysia";
import { db } from "../../infra/db/client";
import { UserModels } from "./model";
import { UserService } from "./service";
import { authGuard, withAuth } from "../../plugins/better-auth.plugin";

/**
 * User Module
 * Following Elysia best practices: Elysia instance IS the controller
 * No separate controller classes
 */
export const UserModule = new Elysia({
  name: "User.Module",
  prefix: "/users",
  tags: ["Users"],
})
  // Use reference models
  .use(UserModels)

  // All routes below require authentication
  .use(authGuard)

  /**
   * GET /users/me - Get current user profile
   * Requires authentication (protected by authGuard)
   */
  .get(
    "/me",
    withAuth(({ user }) => {
      return {
        success: true,
        data: user,
      };
    }),
    {
      detail: {
        summary: "Get current user",
        description: "Returns the authenticated user's profile",
        tags: ["Users"],
        security: [{ cookieAuth: [] }],
      },
      response: {
        200: "user.single",
        401: "user.error",
      },
    }
  )

  /**
   * GET /users - List all users
   * Requires authentication
   */
  .get(
    "/",
    async () => {
      const allUsers = await UserService.findAll(db);

      return {
        success: true,
        data: allUsers,
      };
    },
    {
      detail: {
        summary: "List all users",
        description: "Returns a list of all registered users",
        tags: ["Users"],
        security: [{ cookieAuth: [] }],
      },
      response: {
        200: "user.list",
        401: "user.error",
      },
    }
  )

  /**
   * PATCH /users/me - Update current user
   * Requires authentication
   */
  .patch(
    "/me",
    withAuth(async ({ user, body, set }) => {
      try {
        const updatedUser = await UserService.updateById(db, user.id, body);

        if (!updatedUser) {
          set.status = 404;
          return {
            success: false as const,
            error: "User not found",
          };
        }

        return {
          success: true,
          data: updatedUser,
        };
      } catch (error) {
        set.status = 400;
        return {
          success: false as const,
          error: "Update failed",
          message: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
    {
      body: "user.update",
      detail: {
        summary: "Update current user",
        description: "Updates the authenticated user's profile",
        tags: ["Users"],
        security: [{ cookieAuth: [] }],
      },
      response: {
        200: "user.single",
        400: "user.error",
        401: "user.error",
        404: "user.error",
      },
    }
  )

  /**
   * DELETE /users/:id - Delete user
   * Requires authentication
   */
  .delete(
    "/:id",
    withAuth(async ({ user, params, set }) => {
      // Users can only delete themselves
      if (user.id !== params.id) {
        set.status = 403;
        return {
          success: false as const,
          error: "Forbidden",
          message: "You can only delete your own account",
        };
      }

      const deletedUser = await UserService.deleteById(db, params.id);

      if (!deletedUser) {
        set.status = 404;
        return {
          success: false as const,
          error: "User not found",
        };
      }

      return {
        success: true,
        data: deletedUser,
      };
    }),
    {
      detail: {
        summary: "Delete user",
        description: "Deletes the authenticated user's account",
        tags: ["Users"],
        security: [{ cookieAuth: [] }],
      },
      response: {
        200: "user.single",
        401: "user.error",
        403: "user.error",
        404: "user.error",
      },
    }
  );
