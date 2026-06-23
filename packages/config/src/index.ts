import { z } from "zod";
import * as dotenv from 'dotenv';
import * as path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

const envBoolean = z.enum(["true", "false"]).transform((v) => v === "true");
const envDate = z.iso.datetime({ offset: true }).transform((v) => new Date(v));
const envPort = z.coerce.number().int().positive().min(1).max(65535);

const envSchema = z.object({
	API_PORT: envPort,
    NODE_ENV: z.string().min(1),
    API_DATABASE_URL: z.url()
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
	console.error(result.error.flatten());
	process.exit(1);
}

const parsedEnv = result.data;

export const env = parsedEnv;
export type Env = z.infer<typeof envSchema>;

export const config = {
    node_env: env.NODE_ENV,
	frontend: {
        
    },
    backend: {
        port: parsedEnv.API_PORT,
        database_url: parsedEnv.API_DATABASE_URL
    }
} as const;