import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
	path: "../../.env",
});

export default defineConfig({
	schema: "./src/schema",
	out: "./src/migrations",
	dialect: "postgresql",
	tablesFilter: ["!mastra_*"],
	dbCredentials: {
		url: process.env.DATABASE_URL || "",
	},
});
