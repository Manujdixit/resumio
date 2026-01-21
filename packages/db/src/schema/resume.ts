import { boolean, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import type { ResumeType } from "../types/ResumeSchema";
import { user } from "./auth";

export const resume = pgTable("resume", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	title: text("title").notNull().default("Untitled Resume"),
	content: jsonb("content").$type<ResumeType>().notNull().default({}),
	shareId: text("share_id")
		.unique()
		.$defaultFn(() => nanoid(10)),
	isPublic: boolean("is_public").notNull().default(false),
	thumbnail: text("thumbnail"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
