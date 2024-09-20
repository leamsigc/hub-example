import { defineConfig } from "drizzle-kit";
import { tursoConfig } from "./config";

console.log("Drizzle config", tursoConfig);

export default defineConfig({
  dialect: "sqlite",
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  driver: "turso",
  dbCredentials: {
    url: tursoConfig.url,
    authToken: tursoConfig.authToken,
  },
});
