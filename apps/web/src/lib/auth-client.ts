// import { polarClient } from "@polar-sh/better-auth";
import type { auth } from "@resumio/auth";
import {
  inferAdditionalFields,
  lastLoginMethodClient,
  oneTapClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    // polarClient(),
    oneTapClient({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
    }),
    lastLoginMethodClient(),
  ],
});
