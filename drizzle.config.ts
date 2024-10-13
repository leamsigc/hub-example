import { defineConfig } from "drizzle-kit";
import { tursoConfig } from "./config";

console.log("Drizzle config", tursoConfig);

export default defineConfig({
  dialect: "turso",
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  dbCredentials: {
    url: tursoConfig.url,
    authToken: tursoConfig.authToken,
  },
});
