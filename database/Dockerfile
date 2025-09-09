# ./database/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache netcat-openbsd

# Install pnpm
RUN npm install -g pnpm

# Copy database package files
COPY ./database/package*.json ./

# Install dependencies
RUN pnpm install

# Install drizzle-kit
RUN pnpm add drizzle-kit

# Copy database configuration
COPY ./database/ ./

RUN pnpm db:generate

CMD ["pnpm", "db:migrate"]
