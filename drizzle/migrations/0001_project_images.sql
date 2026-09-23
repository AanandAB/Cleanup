ALTER TABLE `projects` DROP COLUMN `before_image`;--> statement-breakpoint
ALTER TABLE `projects` DROP COLUMN `after_image`;--> statement-breakpoint
ALTER TABLE `projects` ADD `images` text;
