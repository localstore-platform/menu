# Current Work – Menu Repository

> **Last Updated:** 2025-12-06  
> **Current Sprint:** Sprint 0.5 (Menu Demo)  
> **Sprint Spec:** [planning/sprint-0.5-menu-demo.md](https://github.com/localstore-platform/specs/blob/v1.1-specs/planning/sprint-0.5-menu-demo.md)

---

## Sprint 0.5 Stories (This Repo)

| Story | Description | Status | Notes |
|-------|-------------|--------|-------|
| 1.1 | Menu Display Page | ✅ Done | Mobile-first, category navigation |
| 1.2 | VND Currency Formatter | ✅ Done | 13 unit tests passing |
| 3.1 | API Integration | ✅ Done | Connected to localhost:8080 |
| 4.1 | Mobile Optimization | 🔴 Not Started | |
| 4.2 | Demo Deployment (Vercel) | 🔴 Not Started | |

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

**Next Task:** Story 4.1 - Mobile Optimization & Testing

**Requirements:**

- Test on real devices (iPhone, Android)
- Optimize images (compress, WebP)
- Add lazy loading for menu items
- Test on slow 3G network
- Ensure <2s TTI on 4G network
- Fix layout issues on small screens (320px)
- Add touch-friendly tap targets (min 44px)

---

## Session Notes

### Session: 2025-12-06

- Started: Stories 1.1, 1.2, 3.1
- Completed:
  - VND currency formatter with unit tests (formatVND, formatVNDRange)
  - Menu API client with retry logic and error handling
  - Menu types (PublicMenuResponse, MenuItem, MenuCategory)
  - MenuItem component with badges, variants, price display
  - CategoryNav component with sticky navigation and scroll tracking
  - MenuSkeleton and MenuError components
  - Dynamic menu page at `/[tenant]/menu`
  - Jest testing setup with 13 passing tests
- Blockers: None
- Next: Mobile optimization, Vercel deployment

---

## Implementation Summary

### Files Created

```plaintext
lib/
├── api/
│   └── menu-client.ts      # API client with retry logic
├── types/
│   └── menu.ts             # TypeScript types for menu data
└── utils/
    ├── currency.ts         # VND formatter
    └── currency.test.ts    # Unit tests (13 passing)

components/
└── menu/
    ├── index.ts            # Re-exports
    ├── MenuItem.tsx        # Menu item card
    ├── CategoryNav.tsx     # Sticky category tabs
    ├── MenuSkeleton.tsx    # Loading skeleton
    ├── MenuError.tsx       # Error states
    └── MenuContent.tsx     # Main menu content

app/
└── [tenant]/
    └── menu/
        └── page.tsx        # Dynamic menu page
```

### API Integration

- **Endpoint:** `GET /api/v1/menu/:tenantId`
- **Base URL:** `http://localhost:8080` (configurable via NEXT_PUBLIC_API_BASE_URL)
- **Test Tenant:** `550e8400-e29b-41d4-a716-446655440000` (Phở Hà Nội 24)

---

## Blockers

None currently.

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
