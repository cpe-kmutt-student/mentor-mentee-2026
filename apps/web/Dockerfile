FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps/web ./apps/web
COPY packages ./packages

RUN pnpm install --frozen-lockfile

RUN pnpm --filter web build
RUN pnpm --filter @repo/auth build
RUN pnpm --filter @repo/config build



FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

ENV PORT=3000

CMD ["node", "apps/web/server.js"]
