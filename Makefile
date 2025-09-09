.PHONY: build up down logs clean dev prod db-migrate db-studio health

ENV_FILE=--env-file server/.env

# Development commands
dev:
	docker compose $(ENV_FILE) -f docker-compose.yml -f docker-compose.dev.yml up --build

# Production commands
build:
	docker compose $(ENV_FILE) build

up:
	docker compose $(ENV_FILE) up -d

down:
	docker compose $(ENV_FILE) down

logs:
	docker compose $(ENV_FILE) logs -f

# Database commands
db-migrate:
	docker compose $(ENV_FILE) exec server npm run db:migrate

db-studio:
	docker compose $(ENV_FILE) exec server npm run db:studio

# Cleanup commands
clean:
	docker compose $(ENV_FILE) down -v
	docker system prune -f

# Health check
health:
	curl -f http://localhost:3000/health || exit 1
	curl -f http://localhost:80 || exit 1
