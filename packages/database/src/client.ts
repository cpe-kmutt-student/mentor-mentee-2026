import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg'; // Import the Pool
import { PrismaClient } from "../generated/client";
import { config } from "@repo/config";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const pool = new Pool({
  connectionString: config.backend.database_url
});
export const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma || new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error'],
});

if (config.node_env !== "production") globalForPrisma.prisma = prisma;

export * from "../generated/client";
