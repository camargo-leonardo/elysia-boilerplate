import { Elysia, t } from "elysia";

/**
 * Health Module
 * Following Elysia best practices: Elysia instance IS the controller
 */
export const HealthController = new Elysia({
  name: "Health.Module",
  prefix: "/health",
  tags: ["Health"],
})
  /**
   * GET /health - Health check endpoint
   */
  .get(
    "/",
    () => ({
      status: "ok" as const,
      timestamp: new Date().toISOString(),
    }),
    {
      detail: {
        summary: "Health Check",
        description: "Returns the API health status",
        tags: ["Health"],
      },
      response: t.Object({
        status: t.Literal("ok"),
        timestamp: t.String(),
      }),
    }
  );
