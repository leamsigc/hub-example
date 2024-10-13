import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  emailToVerify: text("email_to_verify"),
  name: text("name").notNull(),
  avatar: text("avatar"),
  githubId: integer("github_id").unique(),
  githubToken: text("github_token"),
  twitchId: text("twitch_id").unique(),
  twitchToken: text("twitch_token"),
  verifiedAt: text("verified_at"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const tools = sqliteTable("tools", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  url: text("url"),
  description: text("description"),
  likes: integer("likes"),
  tags: text("tags"),
  pricing: text("pricing"),
  imageUrl: text("image_url"),
  userId: integer("user_id").references(() => users.id),
  categoryId: integer("category_id").references(() => categories.id),
});

export const promotions = sqliteTable("promotions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  toolId: integer("tool_id").references(() => tools.id),
  from: text("from"),
  to: text("to"),
  tag: text("tag"),
});

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  label: text("label"),
});

export const stats = sqliteTable("stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  toolId: integer("tool_id").references(() => tools.id),
  views: integer("views"),
  clicks: integer("clicks"),
  likes: integer("likes"),
});

export const images = sqliteTable("images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  toolId: integer("tool_id").references(() => tools.id),
  url: text("url"),
  tag: text("tag"),
});

export const roles = sqliteTable("roles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  label: text("label"),
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  description: text("description").notNull().default("No description"),
  status: text("status").notNull().default("active"),
  icon: text("icon").notNull().default("i-ph-database-duotone"),
});
// Many-to-many relationship between users and roles
export const userRoles = sqliteTable("user_roles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  roleId: integer("role_id").references(() => roles.id),
});
// Many-to-many relationship between tools and tags
export const toolTags = sqliteTable("tool_tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  toolId: integer("tool_id").references(() => tools.id),
  tagId: integer("tag_id").references(() => tags.id),
});
