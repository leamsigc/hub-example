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

// Users Relationships
// Users Relationships
export const usersRelations = relations(users, ({ many }) => ({
  tools: many(tools), // One-to-Many: Users have many Tools (via tools.userId)
  userRoles: many(userRoles), // Many-to-Many: Users and Roles (via userRoles)
}));

// Tools Relationships
export const toolsRelations = relations(tools, ({ one, many }) => ({
  user: one(users, {
    fields: [tools.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [tools.categoryId],
    references: [categories.id],
  }),
  promotion: one(promotions, {
    fields: [tools.id],
    references: [promotions.toolId],
  }),
  toolTags: many(toolTags),
  stats: one(stats, {
    fields: [tools.id],
    references: [stats.toolId],
  }),
  images: many(images),
}));

// UserRoles Relationships (Many-to-Many between Users and Roles)
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

// Roles Relationships
export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
}));

// Categories Relationships
export const categoriesRelations = relations(categories, ({ many }) => ({
  tools: many(tools),
}));

// Promotions Relationships
export const promotionsRelations = relations(promotions, ({ one }) => ({
  tool: one(tools, {
    fields: [promotions.toolId],
    references: [tools.id],
  }),
}));

// Tags Relationships
export const tagsRelations = relations(tags, ({ many }) => ({
  toolTags: many(toolTags),
}));

// ToolTags Relationships (Many-to-Many between Tools and Tags)
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

// Stats Relationships
export const statsRelations = relations(stats, ({ one }) => ({
  tool: one(tools, {
    fields: [stats.toolId],
    references: [tools.id],
  }),
}));

// Images Relationships
export const imagesRelations = relations(images, ({ one }) => ({
  tool: one(tools, {
    fields: [images.toolId],
    references: [tools.id],
  }),
}));
