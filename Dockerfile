###############################################################################
# Vessel — production Dockerfile
#
# Multi-stage build for Next.js 16 in standalone mode.
#   1. deps    — install npm dependencies in isolation (cache-friendly)
#   2. builder — compile the app (`next build`) with public env vars baked in
#   3. runner  — minimal Alpine image, non-root, serving `node server.js`
#
# Public Clerk keys are inlined at build time, so they must be passed in as
# build args. The Clerk secret key is read at runtime — pass it via env on
# `docker run` / compose, never bake it into the image.
###############################################################################

ARG NODE_VERSION=22-alpine

# ---------- deps ------------------------------------------------------------
FROM node:${NODE_VERSION} AS deps
WORKDIR /app

# libc6-compat keeps native deps (sharp, etc.) happy on Alpine.
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---------- builder ---------------------------------------------------------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

# NEXT_PUBLIC_* values are compiled into the client bundle by `next build`,
# so they have to be present at build time, not just at runtime.
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ---------- runner ----------------------------------------------------------
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as a dedicated, non-root user.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# `output: "standalone"` produces a minimal server tree that does NOT include
# the public folder or .next/static — they have to be copied in alongside it.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Lightweight liveness probe — no curl/wget needed in the image.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+ (process.env.PORT||3000) +'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
