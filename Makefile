.PHONY: help install dev build start lint type-check clean fresh test audit update

# Default target
help:
	@echo "LocalStore Menu - Development Commands"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  install     Install dependencies with pnpm"
	@echo "  dev         Start development server"
	@echo "  build       Build for production (static export)"
	@echo "  start       Start production server"
	@echo "  lint        Run ESLint"
	@echo "  type-check  Run TypeScript type checking"
	@echo "  clean       Remove build artifacts and dependencies"
	@echo "  fresh       Clean install (remove node_modules and reinstall)"
	@echo "  audit       Run security audit"
	@echo "  update      Update dependencies interactively"
	@echo ""

# Install dependencies
install:
	pnpm install

# Development server
dev:
	pnpm dev

# Production build
build:
	pnpm build

# Start production server
start:
	pnpm start

# Run linter
lint:
	pnpm lint

# TypeScript type checking
type-check:
	pnpm type-check

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

# Format code (if prettier is added later)
# format:
# 	pnpm prettier --write .
