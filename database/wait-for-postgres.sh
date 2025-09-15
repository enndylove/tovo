#!/bin/sh
until pg_isready -h postgres -p 5432 -U ${POSTGRES_USER:-postgres}; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done
echo "PostgreSQL is ready!"
