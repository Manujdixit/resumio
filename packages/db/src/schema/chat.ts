import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { user } from "./auth";
import { resume } from "./resume";

// Chat messages table - stores the conversation history for each resume
export const chatMessage = pgTable("chat_message", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  resumeId: text("resume_id")
    .notNull()
    .references(() => resume.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  // Store the full message object from AI SDK (role, content, parts, etc.)
  messages: jsonb("messages").notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
