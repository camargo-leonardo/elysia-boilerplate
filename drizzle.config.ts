import type { Config } from "drizzle-kit";

export default {
  schema: "./src/infra/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://postgres:postgres@localhost:5432/myapp",
  },
} satisfies Config;
