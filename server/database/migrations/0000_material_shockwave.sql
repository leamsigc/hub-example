CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`description` text DEFAULT 'No description' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`icon` text DEFAULT 'i-ph-database-duotone' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `image` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tool_id` integer,
	`url` text,
	`tag` text,
	FOREIGN KEY (`tool_id`) REFERENCES `tool`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `promotion` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tool_id` integer,
	`from` text,
	`to` text,
	`tag` text,
	FOREIGN KEY (`tool_id`) REFERENCES `tool`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `role` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`label` text
);
--> statement-breakpoint
CREATE TABLE `stat` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tool_id` integer,
	`views` integer,
	`clicks` integer,
	`likes` integer,
	FOREIGN KEY (`tool_id`) REFERENCES `tool`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`label` text
);
--> statement-breakpoint
CREATE TABLE `tool_tag` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tool_id` integer,
	`tag_id` integer,
	FOREIGN KEY (`tool_id`) REFERENCES `tool`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tool` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`url` text,
	`description` text,
	`likes` integer,
	`tags` text,
	`pricing` text,
	`image_url` text,
	`user_id` text,
	`category_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_role` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text,
	`role_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`email_to_verify` text,
	`name` text NOT NULL,
	`avatar` text,
	`github_id` integer,
	`github_token` text,
	`twitch_id` text,
	`twitch_token` text,
	`verified_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_github_id_unique` ON `user` (`github_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_twitch_id_unique` ON `user` (`twitch_id`);