import * as path from "node:path";
import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

const envBoolean = z.enum(["true", "false"]).transform((v) => v === "true");
const envDate = z.iso.datetime({ offset: true }).transform((v) => new Date(v));
const envPort = z.coerce.number().int().positive().min(1).max(65535);

const envSchema = z.object({
	NODE_ENV: z.string().min(1),

	API_PORT: envPort,
	API_DATABASE_URL: z.url(),
	API_ALLOW_ORIGIN: z.string().transform((v) => v.split(",")),
	API_DOMAIN: z.string().min(1),

	API_BETTER_AUTH_SECRET: z.string().min(32),
	API_BETTER_AUTH_URL: z.url(),

	API_AUTH_MICROSOFT_CLIENT_ID: z.string().min(1),
	API_AUTH_MICROSOFT_CLIENT_SECRET: z.string().min(1),
	API_AUTH_MICROSOFT_TENANT_ID: z.string().min(1),

	API_LAUNCH_PERIOD_BYPASS: envBoolean,
	API_LAUNCH_PERIOD_START: envDate,

	API_QUEST_1_PERIOD_BYPASS: envBoolean,
	API_QUEST_2_PERIOD_BYPASS: envBoolean,
	API_QUEST_3_PERIOD_BYPASS: envBoolean,
	API_QUEST_1_PERIOD_START: envDate,
	API_QUEST_2_PERIOD_START: envDate,
	API_QUEST_3_PERIOD_START: envDate,
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
	console.error(z.flattenError(result.error).fieldErrors);
	process.exit(1);
}

const parsedEnv = result.data;

export const env = parsedEnv;
export type Env = z.infer<typeof envSchema>;

export const config = {
	nodeEnv: env.NODE_ENV,
	frontend: {},
	backend: {
		port: parsedEnv.API_PORT,
		databaseUrl: parsedEnv.API_DATABASE_URL,
		allowOrigins: env.API_ALLOW_ORIGIN,
		domain: env.API_DOMAIN,
		betterAuth: {
			secret: env.API_BETTER_AUTH_SECRET,
			baseUrl: env.API_BETTER_AUTH_URL,
			microsoft: {
				clientId: env.API_AUTH_MICROSOFT_CLIENT_ID,
				clientSecret: env.API_AUTH_MICROSOFT_CLIENT_SECRET,
				tenantId: env.API_AUTH_MICROSOFT_TENANT_ID,
			},
		},
		period: {
			launch: {
				bypass: env.API_LAUNCH_PERIOD_BYPASS,
				startDate: env.API_LAUNCH_PERIOD_START,
			},
			quest1: {
				bypass: env.API_QUEST_1_PERIOD_BYPASS,
				startDate: env.API_QUEST_1_PERIOD_START,
			},
			quest2: {
				bypass: env.API_QUEST_2_PERIOD_BYPASS,
				startDate: env.API_QUEST_2_PERIOD_START,
			},
			quest3: {
				bypass: env.API_QUEST_3_PERIOD_BYPASS,
				startDate: env.API_QUEST_3_PERIOD_START,
			},
		},
	},
} as const;
