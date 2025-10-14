.PHONY: help install dev start test migrate auth-migrate docker-up docker-down docker-logs clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	bun install

dev: ## Start development server
	bun run dev

start: ## Start production server
	bun run start

test: ## Run tests
	bun test

migrate-generate: ## Generate database migrations
	bun run migrate:generate

migrate: ## Apply database migrations
	bun run migrate:apply

auth-generate: ## Generate Better Auth migration
	bun run auth:generate

auth-migrate: ## Apply Better Auth migrations
	bun run auth:migrate

db-studio: ## Open Drizzle Studio
	bun run db:studio

docker-up: ## Start Docker containers
	docker-compose up -d

docker-down: ## Stop Docker containers
	docker-compose down

docker-logs: ## Show Docker logs
	docker-compose logs -f

docker-rebuild: ## Rebuild and restart Docker containers
	docker-compose up -d --build

clean: ## Clean build artifacts and dependencies
	rm -rf node_modules dist coverage
	docker-compose down -v
