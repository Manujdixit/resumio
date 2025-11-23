import { pgTable, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { nanoid } from "nanoid";

export const resume = pgTable("resume", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull().default("Untitled Resume"),
  content: jsonb("content").notNull().default({}),
  shareId: text("share_id")
    .unique()
    .$defaultFn(() => nanoid(10)),
  isPublic: boolean("is_public").notNull().default(false),
  thumbnail: text("thumbnail"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
