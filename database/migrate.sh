#!/bin/sh
./wait-for-postgres.sh
echo "Running database migrations..."
pnpm db:migrate
echo "Migrations completed!"
