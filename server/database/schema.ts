import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

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
// Remove
export const usersRelations = relations(users, ({ many }) => ({
  tools: many(tools),
  userRoles: many(userRoles),
}));

export const tools = sqliteTable("tools", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  url: text("url"),
  description: text("description"),
  likes: integer("likes"),
  tags: text("tags"),
  pricing: text("pricing"),
  imageUrl: text("image_url"),
  userId: integer("user_id").references(() => users.id),
  categoryId: integer("category_id").references(() => categories.id),
});

// Remove
export const toolsRelations = relations(tools, ({ one, many }) => ({
  user: one(users, {
    fields: [tools.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [tools.categoryId],
    references: [categories.id],
  }),
  promotion: one(promotions),
  stats: one(stats),
  images: many(images),
  toolTags: many(toolTags),
}));

export const promotions = sqliteTable("promotions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  toolId: integer("tool_id").references(() => tools.id),
  from: text("from"),
  to: text("to"),
  tag: text("tag"),
});
// Remove
export const promotionsRelations = relations(promotions, ({ one }) => ({
  tool: one(tools, {
    fields: [promotions.toolId],
    references: [tools.id],
  }),
}));

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  label: text("label"),
});
// Remove
export const tagsRelations = relations(tags, ({ many }) => ({
  toolTags: many(toolTags),
}));

export const stats = sqliteTable("stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  toolId: integer("tool_id").references(() => tools.id),
  views: integer("views"),
  clicks: integer("clicks"),
  likes: integer("likes"),
});

// Remove
export const statsRelations = relations(stats, ({ one }) => ({
  tool: one(tools, {
    fields: [stats.toolId],
    references: [tools.id],
  }),
}));

export const images = sqliteTable("images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  toolId: integer("tool_id").references(() => tools.id),
  url: text("url"),
  tag: text("tag"),
});
// Remove
export const imagesRelations = relations(images, ({ one }) => ({
  tool: one(tools, {
    fields: [images.toolId],
    references: [tools.id],
  }),
}));

export const roles = sqliteTable("roles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  label: text("label"),
});
// Remove
export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
}));

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  description: text("description"),
});
// Remove
export const categoriesRelations = relations(categories, ({ many }) => ({
  tools: many(tools),
}));

// Many-to-many relationship between users and roles
export const userRoles = sqliteTable("user_roles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  roleId: integer("role_id").references(() => roles.id),
});
// Remove
export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}));
// Many-to-many relationship between tools and tags
export const toolTags = sqliteTable("tool_tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  toolId: integer("tool_id").references(() => tools.id),
  tagId: integer("tag_id").references(() => tags.id),
});

// Remove
export const toolTagsRelations = relations(toolTags, ({ one }) => ({
  tool: one(tools, {
    fields: [toolTags.toolId],
    references: [tools.id],
  }),
  tag: one(tags, {
    fields: [toolTags.tagId],
    references: [tags.id],
  }),
}));
