FROM node:18-alpine AS builder
WORKDIR /app

# Enable corepack and install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace configuration
COPY package.json pnpm-workspace.yaml ./

# Copy package.json files for all packages
COPY database/package.json ./database/
COPY server/package.json ./server/

# Install all dependencies
RUN pnpm install

# Copy and build database first
COPY database/ ./database/
WORKDIR /app/database
RUN pnpm run build

# Copy and build server
WORKDIR /app
COPY server/ ./server/
WORKDIR /app/server
RUN pnpm run build

# Production image
FROM node:18-alpine AS production
WORKDIR /app

# Enable corepack and install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Add user
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

# Copy workspace files
COPY --from=builder --chown=nestjs:nodejs /app/package.json /app/pnpm-workspace.yaml ./
COPY --from=builder --chown=nestjs:nodejs /app/database/package.json ./database/
COPY --from=builder --chown=nestjs:nodejs /app/server/package.json ./server/

# Install only production dependencies
RUN pnpm install

# Copy built files
COPY --from=builder --chown=nestjs:nodejs /app/database/dist ./database/dist
COPY --from=builder --chown=nestjs:nodejs /app/server/dist ./server/dist

# Debug: Verify files were copied
RUN ls -la /app/server/dist/ || echo "Server dist not found"

# Clean up
RUN pnpm store prune

WORKDIR /app/server
USER nestjs
EXPOSE 3000
CMD ["node", "dist/src/main.js"]
