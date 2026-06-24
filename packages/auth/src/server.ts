import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, openAPI, username } from "better-auth/plugins";
import { config } from "@repo/config";
import { prisma } from "@repo/database";

export const auth = betterAuth({
	basePath: "/api/auth",
	trustedOrigins: config.backend.allowOrigins,
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	session: {
		strategy: "database",
		expiresIn: 60 * 60 * 24 * 7, // 7 days
	},
	advanced: {
		crossSubDomainCookies: {
			enabled: config.nodeEnv === "production",
			domain: config.backend.domain,
		},
	},
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		// google: {
		// 	clientId: confidg.auth.googleClientId,
		// 	clientSecret: config.auth.googleClientSecret,
		// },
		microsoft: {
			clientId: process.env.MICROSOFT_CLIENT_ID as string,
			clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
			// Optional
			tenantId: "common",
			authority: "https://login.microsoftonline.com", // Authentication authority URL
			prompt: "select_account", // Forces account selection
		},
	},
	hooks: {},
	plugins: [admin(), username(), openAPI()],
	user: {
		deleteUser: {
			enabled: true,
		},
	},
});
