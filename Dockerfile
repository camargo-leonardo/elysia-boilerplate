# Use Bun official image
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Build the application (if needed)
FROM base AS build
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile
COPY . .
# Uncomment if you need build step
# RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3003

# Copy dependencies and source
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app ./

EXPOSE 3003

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun run -e "fetch('http://localhost:3003/health').then(r => r.ok ? process.exit(0) : process.exit(1))"

CMD ["bun", "run", "start"]
