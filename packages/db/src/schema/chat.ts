import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { resume } from "./resume";
import { user } from "./auth";
import { nanoid } from "nanoid";

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
