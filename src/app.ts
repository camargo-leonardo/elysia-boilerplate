import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { auth, OpenAPI } from "./infra/auth";
import { UserController } from "./modules/user/user.controller";
import { HealthController } from "./modules/health/health.controller";

/**
 * Create and configure Elysia app
 * Following Elysia best practices: Modular architecture with feature-based modules
 */
export async function createApp() {
  const app = new Elysia()
    .use(
      openapi({
        documentation: {
          components: await OpenAPI.components,
          paths: await OpenAPI.getPaths(),
        },
      })
    )

    .use(
      cors({
        origin: process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",") || [
          "http://localhost:3003",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    )

    .onError(({ code, error, set }) => {
      console.error("Error:", error);

      if (code === "VALIDATION") {
        set.status = 400;
        return {
          success: false,
          error: "Validation failed",
          details: error.message,
        };
      }

      if (code === "NOT_FOUND") {
        set.status = 404;
        return {
          success: false,
          error: "Route not found",
        };
      }

      set.status = 500;
      return {
        success: false,
        error: "Internal server error",
        message:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      };
    })

    // Request logging (dev only)
    .onRequest(({ request }) => {
      if (process.env.NODE_ENV === "development")
        console.log(`${request.method} ${new URL(request.url).pathname}`);
    })

    // Mount auth routes at /auth
    .mount("/auth", auth.handler)

    // Register all modules using .use() - Feature-based architecture
    .use(HealthController)
    .use(UserController);

  return app;
}
