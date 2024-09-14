import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from "@libsql/client";
import * as schema from '../database/schema'

export { sql, eq, and, or, isNull } from 'drizzle-orm'

export const tables = schema

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
export function useDrizzle() {
  return drizzle(turso, { schema })
}

export type User = typeof schema.users.$inferSelect
export type UserInsert = typeof schema.users.$inferInsert
