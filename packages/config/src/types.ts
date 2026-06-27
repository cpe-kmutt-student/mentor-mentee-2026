import type z from "zod";
import type { envSchema } from "./config";

export type Env = z.infer<typeof envSchema>;

export type Config = {
	nodeEnv: string;
	frontend: {
		betterAuth: {
			baseUrl: string;
		};
	};
	backend: {
		port: number;
		databaseUrl: string;
		allowOrigins: string[];
		domain: string;
		betterAuth: {
			secret: string;
			baseUrl: string;
			microsoft: {
				clientId: string;
				clientSecret: string;
				tenantId: string;
			};
		};
		period: {
			launch: {
				bypass: boolean;
				startDate: Date;
			};
			quest1: {
				bypass: boolean;
				startDate: Date;
			};
			quest2: {
				bypass: boolean;
				startDate: Date;
			};
			quest3: {
				bypass: boolean;
				startDate: Date;
			};
		};
		s3: {
			region: string;
			endpoint: string;
			accessKey: string;
			secretKey: string;
			bucket: string;
		};
	};
};
