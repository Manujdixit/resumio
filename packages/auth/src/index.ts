// import { polar, checkout, portal } from "@polar-sh/better-auth";
// import { polarClient } from "./lib/payments";
import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Load environment variables from the monorepo root
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../../.env") });

import { db } from "@resumio/db";
import * as schema from "@resumio/db/schema/auth";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { haveIBeenPwned, lastLoginMethod, oneTap } from "better-auth/plugins";

export const auth = betterAuth<BetterAuthOptions>({
	database: drizzleAdapter(db, {
		provider: "pg",

		schema: schema,
	}),
	secret: process.env.BETTER_AUTH_SECRET,
	trustedOrigins: [process.env.CORS_ORIGIN || ""],
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		},
		github: {
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
		},
		facebook: {
			clientId: process.env.FACEBOOK_CLIENT_ID || "",
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
		},
		linkedin: {
			clientId: process.env.LINKEDIN_CLIENT_ID || "",
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
		},
	},
	account: {
		accountLinking: {
			enabled: true,
		},
	},
	plugins: [
		oneTap(),
		// polar({
		// 	client: polarClient,
		// 	createCustomerOnSignUp: true,
		// 	enableCustomerPortal: true,
		// 	use: [
		// 		checkout({
		// 			products: [
		// 				{
		// 					productId: "your-product-id",
		// 					slug: "pro",
		// 				},
		// 			],
		// 			successUrl: process.env.POLAR_SUCCESS_URL,
		// 			authenticatedUsersOnly: true,
		// 		}),
		// 		portal(),
		// 	],
		// }),
		nextCookies(),
		haveIBeenPwned({
			customPasswordCompromisedMessage: "Please choose a more secure password.",
		}),
		lastLoginMethod({ storeInDatabase: true }),
	],
});
