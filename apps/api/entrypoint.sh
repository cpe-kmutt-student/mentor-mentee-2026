#!/bin/sh
set -e

echo "Building Package"
pnpm --filter @repo/config build
pnpm --filter @repo/database build
pnpm --filter @repo/auth build
pnpm --filter @repo/storage build

echo "Running Database Migrations..."
pnpm --filter @repo/database run db:migrate:deploy

# echo "Generating Prisma Client..."
# pnpm --filter @repo/database run generate

echo "Starting API..."
exec "$@"
