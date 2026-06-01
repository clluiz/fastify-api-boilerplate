# =============================================================================
# Stage 1 — deps
# Install production dependencies only (no devDeps)
# =============================================================================
FROM node:20-alpine AS deps

# Enable Corepack so we can use pnpm without a separate install step
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy lockfile + manifests first for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# =============================================================================
# Stage 2 — builder
# Compile TypeScript to JavaScript
# =============================================================================
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install ALL dependencies (including devDeps needed for tsc)
RUN pnpm install --frozen-lockfile

# Copy source code and TypeScript config
COPY tsconfig.json ./
COPY src ./src

# Compile
RUN pnpm build

# =============================================================================
# Stage 3 — production
# Slim runtime image — only compiled JS + prod node_modules
# =============================================================================
FROM node:20-alpine AS production

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy production node_modules from deps stage
COPY --from=deps  /app/node_modules ./node_modules

# Copy compiled output from builder stage
COPY --from=builder /app/dist ./dist

# Copy package.json (needed for "type": "module" resolution)
COPY package.json ./

# Switch to non-root user
USER appuser

# Expose the port defined in the .env (default 5000)
EXPOSE 5000

# Health-check so orchestrators (ECS, Cloud Run, etc.) can verify liveness
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5000/health || exit 1

CMD ["node", "dist/server.js"]
