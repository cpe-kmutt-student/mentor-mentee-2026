import * as path from "node:path";
import * as dotenv from "dotenv";
import { z } from "zod";
import type { Config, Env } from "./types";

const envBoolean = z.enum(["true", "false"]).transform((v) => v === "true");
const envDate = z.iso.datetime({ offset: true }).transform((v) => new Date(v));
const envPort = z.coerce.number().int().positive().min(1).max(65535);

export const envSchema = z.object({
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

	API_S3_REGION: z.string(),
	API_S3_ENDPOINT: z.url(),
	API_S3_ACCESS_KEY: z.string().min(1),
	API_S3_SECRET_KEY: z.string().min(1),
	API_S3_BUCKET: z.string().min(1),

	WEB_BETTER_AUTH_URL: z.url(),
});

let cachedEnv: Env | undefined;
let cachedConfig: Config | undefined;

export function loadEnv(): Env {
	if (cachedEnv) {
		return cachedEnv;
	}

	dotenv.config({
		path: path.resolve(process.cwd(), "../../.env"),
	});

	const result = envSchema.safeParse(process.env);

	if (!result.success) {
		throw new Error(
			JSON.stringify(z.flattenError(result.error).fieldErrors, null, 2),
		);
	}

	cachedEnv = result.data;
	return cachedEnv;
}

export function loadConfig(): Config {
	if (cachedConfig) {
		return cachedConfig;
	}

	const env = loadEnv();

	cachedConfig = {
		nodeEnv: env.NODE_ENV,
		frontend: {
			betterAuth: {
				baseUrl: env.WEB_BETTER_AUTH_URL,
			},
		},
		backend: {
			port: env.API_PORT,
			databaseUrl: env.API_DATABASE_URL,
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
			s3: {
				region: env.API_S3_REGION,
				endpoint: env.API_S3_ENDPOINT,
				accessKey: env.API_S3_ACCESS_KEY,
				secretKey: env.API_S3_SECRET_KEY,
				bucket: env.API_S3_BUCKET,
			},
		},
	};

	return cachedConfig;
}

export const config = new Proxy({} as Config, {
	get(_, prop) {
		return loadConfig()[prop as keyof Config];
	},
});

export const env = new Proxy({} as Env, {
	get(_, prop) {
		return loadEnv()[prop as keyof Env];
	},
});
