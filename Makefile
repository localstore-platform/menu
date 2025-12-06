.PHONY: help install dev build start lint type-check test clean fresh audit update \
        docker-dev docker-prod docker-build docker-up docker-down docker-logs docker-clean

# Default target
help:
	@echo "LocalStore Menu - Development Commands"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Local Development:"
	@echo "  install     Install dependencies with pnpm"
	@echo "  dev         Start development server (with Turbopack)"
	@echo "  build       Build for production"
	@echo "  start       Start production server"
	@echo "  test        Run tests"
	@echo "  lint        Run ESLint"
	@echo "  type-check  Run TypeScript type checking"
	@echo ""
	@echo "Docker Commands:"
	@echo "  docker-dev    Start development environment with Docker"
	@echo "  docker-prod   Start production environment with Docker"
	@echo "  docker-build  Build Docker images"
	@echo "  docker-down   Stop all services"
	@echo "  docker-logs   View service logs"
	@echo "  docker-clean  Remove containers, images, and volumes"
	@echo ""
	@echo "Maintenance:"
	@echo "  clean       Remove build artifacts and dependencies"
	@echo "  fresh       Clean install (remove node_modules and reinstall)"
	@echo "  audit       Run security audit"
	@echo "  update      Update dependencies interactively"
	@echo ""

# =============================================================================
# Local Development
# =============================================================================

# Install dependencies
install:
	pnpm install

# Development server (with Turbopack)
dev:
	pnpm dev

# Production build
build:
	pnpm build

# Start production server
start:
	pnpm start

# Run tests
test:
	pnpm test

# Run linter
lint:
	pnpm lint

# TypeScript type checking
type-check:
	pnpm type-check

# =============================================================================
# Docker Commands
# =============================================================================

# Start development environment
# Uses docker-compose.yml + docker-compose.dev.yml
docker-dev:
	pnpm docker:dev

# Start development environment (detached)
docker-dev-detach:
	pnpm docker:dev:detach

# Start production environment
# Uses docker-compose.yml only
docker-prod:
	pnpm docker:prod

# Build Docker images
docker-build:
	pnpm docker:build

# Stop services
docker-down:
	pnpm docker:down

# View logs
docker-logs:
	pnpm docker:logs

# Clean up Docker resources
docker-clean:
	pnpm docker:clean

# Shell into menu container
docker-shell:
	pnpm docker:shell

# Run tests in Docker
docker-test:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml exec menu pnpm test

# =============================================================================
# Maintenance
# =============================================================================

# Clean build artifacts
clean:
	rm -rf .next out node_modules

# Fresh install
fresh: clean install

# Security audit
audit:
	pnpm audit

# Update dependencies interactively
update:
	pnpm update --interactive
