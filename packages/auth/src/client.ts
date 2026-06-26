import { config } from "@repo/config";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: config.frontend.betterAuth.baseUrl,
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
