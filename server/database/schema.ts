import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  emailToVerify: text('email_to_verify'),
  name: text('name').notNull(),
  avatar: text('avatar'),
  githubId: integer('github_id').unique(),
  githubToken: text('github_token'),
  twitchId: text('twitch_id').unique(),
  twitchToken: text('twitch_token'),
  verifiedAt: text('verified_at'),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => sql`(current_timestamp)`),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => sql`(current_timestamp)`)
    .$onUpdateFn(() => sql`(current_timestamp)`),
})


export const tools = sqliteTable('tools', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  url: text('url').notNull(),
  description: text('description'),
  likes: integer('likes'),
  tags: text('tags'),
  pricing: text('pricing'),
});

export const images = sqliteTable('images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  toolId: integer('tool_id').references(() => tools.id),
  url: text('url').notNull(),
  tag: text('tag'),
});

export const promotions = sqliteTable('promotions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  toolId: integer('tool_id').references(() => tools.id),
  from: text('from'),
  to: text('to'),
  tag: text('tag'),
});
export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  label: text('label'),
});
export const stats = sqliteTable('stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  toolId: integer('tool_id').references(() => tools.id),
  views: integer('views'),
  clicks: integer('clicks'),
  likes: integer('likes'),
});
