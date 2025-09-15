FROM node:18-alpine

WORKDIR /app

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY ./database/package*.json ./
RUN pnpm install

# Copy all database files
COPY ./database/ ./

# Generate Drizzle migrations
RUN pnpm db:generate

# Create a simple migration script
RUN echo '#!/bin/sh' > /migrate.sh && \
  echo 'echo "Waiting for PostgreSQL to be ready..."' >> /migrate.sh && \
  echo 'until pg_isready -h postgres -p 5432 -U postgres; do' >> /migrate.sh && \
  echo '  echo "Still waiting..."' >> /migrate.sh && \
  echo '  sleep 2' >> /migrate.sh && \
  echo 'done' >> /migrate.sh && \
  echo 'echo "PostgreSQL is ready!"' >> /migrate.sh && \
  echo 'echo "Running database migrations..."' >> /migrate.sh && \
  echo 'pnpm db:migrate' >> /migrate.sh && \
  echo 'echo "Migrations completed successfully!"' >> /migrate.sh

RUN chmod +x /migrate.sh

CMD ["/migrate.sh"]
