import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { createInsertSchema } from "drizzle-zod";
import * as schema from "../database/schema";
import { tursoConfig } from "~~/config";

export { sql, eq, and, or, isNull } from "drizzle-orm";

export const tables = schema;

const turso = createClient({
  url: tursoConfig.url,
  authToken: tursoConfig.authToken,
});
export function useDrizzle() {
  return drizzle(turso, { schema });
}

export type User = typeof schema.users.$inferSelect;
export type UserInsert = typeof schema.users.$inferInsert;
export type RoleInsert = typeof schema.roles.$inferInsert;

export type Category = typeof schema.categories.$inferSelect;
export type CategoryInsert = typeof schema.categories.$inferInsert;

export const insertCategorySchema = createInsertSchema(schema.categories);

type RoleId = number;
export type UserInsertWithRole = UserInsert & { roles: RoleId[] };

export type Tool = typeof schema.tools.$inferSelect;
export type ToolInsert = typeof schema.tools.$inferInsert;

export const insertToolSchema = createInsertSchema(schema.tools);
