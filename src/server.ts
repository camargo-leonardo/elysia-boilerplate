import { createApp } from "./app";
import { testConnection, closeDatabase } from "./infra/db/client";

const PORT = process.env.PORT || 3003;

/**
 * Start the server
 */
async function start() {
  try {
    // Test database connection
    console.log("Testing database connection...");
    const isConnected = await testConnection();

    if (!isConnected) {
      console.error("Failed to connect to database");
      process.exit(1);
    }

    console.log("Database connected successfully");

    // Create and start app
    const app = await createApp();

    app.listen(PORT, () => {
      console.log(`🦊 Server is running on http://localhost:${PORT}`);
      console.log(`📚 API Documentation at http://localhost:${PORT}/docs`);
      console.log(
        `📚 Auth endpoints available at http://localhost:${PORT}/api/auth/*`
      );
      console.log(`🏥 Health check at http://localhost:${PORT}/health`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      console.log("\nShutting down gracefully...");
      await closeDatabase();
      process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
