# Current Work – Menu Repository

> **Last Updated:** 2025-12-06  
> **Current Sprint:** Sprint 0.5 (Menu Demo)  
> **Sprint Spec:** [planning/sprint-0.5-menu-demo.md](https://github.com/localstore-platform/specs/blob/v1.1-specs/planning/sprint-0.5-menu-demo.md)

---

## Sprint 0.5 Stories (This Repo)

| Story | Description | Status | Notes |
|-------|-------------|--------|-------|
| 1.1 | Menu Display Page | ✅ Done | Mobile-first, category navigation |
| 1.2 | VND Currency Formatter | ✅ Done | Now using @localstore/contracts |
| 3.1 | API Integration | ✅ Done | Updated to use contracts DTOs |
| 4.1 | Mobile Optimization | ✅ Done | PWA support, 320px screens, touch targets |
| 4.2 | Demo Deployment (Vercel) | ⏸️ Blocked | Waiting for API infra deployment |
| - | Contracts Integration | ✅ Done | @localstore/contracts@0.2.0 integrated |

**Status Legend:** 🔴 Not Started | 🟡 In Progress | ✅ Done | ⏸️ Blocked

---

## Spec References

| Story | Specification | Lines |
|-------|--------------|-------|
| 1.1 | [wireframes-ux-flow.md](https://github.com/localstore-platform/specs/blob/v1.1-specs/design/wireframes-ux-flow.md) | L50-L120 |
| 1.2 | [vietnam-market-strategy.md](https://github.com/localstore-platform/specs/blob/v1.1-specs/research/vietnam-market-strategy.md) | L80-L95 |
| 3.1 | [api-specification.md](https://github.com/localstore-platform/specs/blob/v1.1-specs/architecture/api-specification.md) | L200-L280 |
| 4.1 | [vietnam-market-strategy.md](https://github.com/localstore-platform/specs/blob/v1.1-specs/research/vietnam-market-strategy.md) | L60-L80 |
| 4.2 | [sprint-0.5-menu-demo.md](https://github.com/localstore-platform/specs/blob/v1.1-specs/planning/sprint-0.5-menu-demo.md) | L150-L180 |

---

## Current Focus

**Next Task:** Story 4.2 - Demo Deployment (Vercel) ⏸️ BLOCKED

**Waiting for:**

- API infrastructure deployment (api repo)
- Production API URL

**Once unblocked:**

- Deploy to Vercel with static export
- Configure production API URL
- Test production build
- Verify performance metrics

---

## Session Notes

### Session: 2025-12-06 (Contracts Integration)

- Synced events from #agent-events
- Installed @localstore/contracts@0.2.0
- Integrated contracts types:
  - Re-exported DTOs from contracts in lib/types/menu.ts
  - Created UI-friendly camelCase types (MenuData, MenuItem, MenuCategory, MenuStore)
  - Added DTO-to-UI transformer functions in menu-client.ts
  - Updated MenuItem component to use contracts types
  - Updated MenuContent component to use new MenuData type
  - Updated currency utilities to re-export from contracts
  - Updated tests to match contracts format (space before ₫ symbol)
- All 9 tests passing
- TypeScript and ESLint checks passing

### Session: 2025-12-06 (Sprint 0.5)

- Started: Stories 1.1, 1.2, 3.1, 4.1
- Completed:
  - VND currency formatter with unit tests (formatVND, formatVNDRange)
  - Menu API client with retry logic and error handling
  - Menu types (PublicMenuResponse, MenuItem, MenuCategory)
  - MenuItem component with badges, variants, price display
  - CategoryNav component with sticky navigation and scroll tracking
  - MenuSkeleton and MenuError components
  - Dynamic menu page at `/[tenant]/menu`
  - Jest testing setup with 13 passing tests
  - **Mobile Optimization (Story 4.1):**
    - PWA manifest with SVG icons
    - Safe area insets for notched phones (iPhone X+)
    - xs breakpoint (360px) for 320px screen support
    - Touch feedback on menu items (active:scale-[0.99])
    - Min 44px touch targets
    - Responsive images (16/20px on small/normal screens)
    - Debounced intersection observer to reduce re-renders
    - ESLint flat config setup
- Blockers: None
- Next: Vercel deployment (Story 4.2)

---

## Implementation Summary

### Files Created/Updated

```plaintext
lib/
├── api/
│   └── menu-client.ts      # API client with DTO transformers (updated)
├── types/
│   └── menu.ts             # Re-exports from @localstore/contracts (updated)
└── utils/
    ├── currency.ts         # Re-exports from contracts (updated)
    └── currency.test.ts    # Unit tests (9 passing)

components/
└── menu/
    ├── index.ts            # Re-exports
    ├── MenuItem.tsx        # Uses contracts types (updated)
    ├── CategoryNav.tsx     # Uses contracts types (updated)
    ├── MenuSkeleton.tsx    # Loading skeleton
    ├── MenuError.tsx       # Error states
    └── MenuContent.tsx     # Uses MenuData type (updated)

app/
├── layout.tsx              # PWA metadata, viewport config
├── globals.css             # xs breakpoint, safe-area utilities
└── [tenant]/
    └── menu/
        └── page.tsx        # Uses store.name (updated)

public/
├── manifest.json           # PWA manifest
└── icons/
    ├── icon-192.svg        # PWA icon 192x192
    └── icon-512.svg        # PWA icon 512x512

eslint.config.mjs           # ESLint 9 flat config
package.json                # Added @localstore/contracts@0.2.0
```

### Contracts Integration

**Package:** `@localstore/contracts@0.2.0`

**Types imported:**

- `PublicMenuResponse` (DTO - snake_case)
- `MenuCategoryDto` (DTO - snake_case)
- `MenuItemDto` (DTO - snake_case)
- `MenuStoreInfoDto` (DTO - snake_case)
- `ApiError`

**Utilities imported:**

- `formatVND()` - VND currency formatter
- `formatVNDRange()` - Price range formatter
- `formatVNDCompact()` - Compact VND formatter

**Architecture:**

- API layer receives snake_case DTOs from contracts
- Transformer functions convert to camelCase UI types
- Components use UI-friendly camelCase types

---

## Blockers

**Story 4.2 - Vercel Deployment:**

- ⏸️ Waiting for API infrastructure deployment
- Need production API URL before deploying menu to Vercel
- Dependency: `api` repo must deploy first to provide data endpoint

---

## Quick Commands

```bash
pnpm install       # Install dependencies
pnpm dev           # Start dev server (localhost:3000)
pnpm test          # Run tests (13 passing)
pnpm type-check    # TypeScript check
pnpm build         # Production build
```

---

## Test URL

```url
http://localhost:3000/550e8400-e29b-41d4-a716-446655440000/menu
```
