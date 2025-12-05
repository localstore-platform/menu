# Git Workflow Instructions

This document defines the standard git workflow for LocalStore Platform repositories.

## Commit Workflow

When committing changes, follow these rules:

### 1. Never Commit Directly to Main

- **Always** create a new branch for changes
- If currently on `main`, checkout to a new branch before committing
- Branch naming convention: `<type>/<short-description>`
  - Examples: `feat/add-menu-api`, `fix/currency-format`, `chore/update-deps`

### 2. Branch Naming Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Maintenance, dependencies, tooling |
| `docs` | Documentation only |
| `refactor` | Code refactoring |
| `style` | Formatting, styling |
| `test` | Adding or updating tests |
| `perf` | Performance improvements |

### 3. Logical Commits

- Group related changes into logical commits
- Each commit should represent a single logical change
- Use conventional commit format for messages:

```text
<type>: <short description>

- Detail 1
- Detail 2
```

### 4. Pull Request Workflow

After committing:

1. Push the branch to origin
2. Create a PR to `main` branch
3. If PR already exists, update the title and description to reflect current changes
4. Use the repository's PR template

### 5. Commit Message Examples

```bash
# Good
feat: add Vietnamese currency formatting utility
fix: correct VND decimal separator
chore: migrate from npm to pnpm
docs: update API specification links

# Bad
update code
fix stuff
WIP
```

## Quick Reference

```bash
# Check current branch
git branch --show-current

# Create new branch from main
git checkout -b feat/my-feature

# Stage and commit logically
git add <related-files>
git commit -m "feat: description"

# Push and create PR
git push -u origin feat/my-feature
gh pr create --base main
```

## Related

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
