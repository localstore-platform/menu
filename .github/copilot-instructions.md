# GitHub Copilot Instructions – Menu Repository

This extends the global instructions from the [specs repository](https://github.com/localstore-platform/specs/blob/v1.1-specs/.github/copilot-instructions.md).

## Repository Context

- **Repository:** menu
- **Purpose:** Next.js public-facing menu website for customers to view restaurant menus
- **Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS 3.4, Static Export
- **Deployment:** Vercel with static export
- **Spec Version:** v1.1-specs

---

## 🚀 "Continue Work" Trigger

When the user says **"continue work"**, **"tiếp tục"**, or **"next task"**:

### Step 1: Read Local Progress

Read `docs/CURRENT_WORK.md` in this repository to understand:

- Current sprint and focus
- Which stories are assigned to this repo
- Current status of each story (🔴 Not Started / 🟡 In Progress / ✅ Done)
- Any blockers or notes from previous session

### Step 2: Identify Next Task

From CURRENT_WORK.md:

1. If any story is 🟡 In Progress → continue that story
2. Otherwise, pick the first 🔴 Not Started story
3. If all stories are ✅ Done → report completion and suggest next sprint

### Step 3: Load Specifications

1. Check the "Spec References" section in CURRENT_WORK.md for the spec link
2. Fetch and read the relevant specification section
3. Also check `docs/SPEC_LINKS.md` for additional context if needed

### Step 4: Implement

1. Follow the spec exactly
2. Apply code standards from this file (see below)
3. Mobile-first, Vietnamese locale (vi-VN), VND formatting

### Step 5: Update Progress

After implementation, **update `docs/CURRENT_WORK.md`**:

- Change story status from 🔴 to 🟡 (in progress) or ✅ (done)
- Add notes about what was implemented
- Add any blockers or follow-up items
- Update "Last Updated" timestamp

### Step 6: Git Workflow

1. Create/use feature branch: `feat/<story-description>`
2. Commit with conventional message
3. Run `npm run lint && npm run test`
4. Create PR when story is complete

### Step 7: Post Event to Slack

After completing a story, post an event to `#agent-events` (channel ID: `C0A1VSFQ9SS`):

```
✅ STORY_DONE from menu: [Story Title]
---
Details: [What UI/features were implemented]
Affected: [api, specs]
Action: [Any API needs or spec updates required]
Spec: [Link to relevant spec section]
```

Use `slack_post_message` with channel_id `C0A1VSFQ9SS`.

### Step 8: Report

Tell the user:

- What story you worked on
- What was implemented
- Current status
- What's next
- Event posted to Slack

---

## 🔄 "Sync Events" Trigger

When the user says **"sync events"**, **"check events"**, or **"đồng bộ"**:

1. **Read recent messages** from `#agent-events` (channel ID: `C0A1VSFQ9SS`) using `slack_get_channel_history`
2. **Filter for events affecting this repo** (look for "menu" in Affected field)
3. **Report relevant events** to user with recommended actions
4. **If API_READY from api** → integrate new endpoints
5. **If SCHEMA_UPDATED from contracts** → update type imports

---

## Key Spec Files

| Spec File | Sections | Purpose |
|-----------|----------|---------|
| `design/wireframes-ux-flow.md` | Lines 200-400 | Customer menu views |
| `architecture/api-specification.md` | Lines 400-600 | Menu public endpoints |
| `research/vietnam-market-strategy.md` | Mobile section | 4G optimization, <2s TTI |
| `planning/sprint-0.5-menu-demo.md` | Stories 1.1, 1.2, 3.1, 4.1-4.2 | Current sprint tasks |

Also check `docs/SPEC_LINKS.md` for curated links with line numbers.

---

## Build & Test Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (localhost:3000)
npm run test         # Run tests
npm run lint         # Lint code
npm run build        # Build for production (static export)
npm run start        # Preview production build
vercel --prod        # Deploy to Vercel
```

---

## Project Structure

```text
app/
├── [tenant]/
│   └── menu/
│       └── page.tsx      # Dynamic menu page
├── layout.tsx            # Root layout with vi-VN locale
└── page.tsx              # Landing/redirect

components/
├── menu/
│   ├── MenuItem.tsx      # Menu item card
│   ├── CategoryNav.tsx   # Category tabs/sections
│   └── MenuSkeleton.tsx  # Loading state
└── ui/                   # Shared UI components

lib/
├── api/
│   └── menu-client.ts    # API client
└── utils/
    └── currency.ts       # formatVND()
```

---

## Code Standards

### Next.js Patterns

- Use App Router (`app/` directory)
- Server Components by default, Client Components only when needed
- Dynamic routes for tenant: `app/[tenant]/menu/page.tsx`
- Static export for Vercel deployment

### Tailwind CSS

- Use design tokens from `tailwind.config.js`
- Mobile-first: start with mobile styles, add `md:` for larger screens
- Vietnamese-friendly: ensure proper text wrapping for Vietnamese characters

### Performance

- Target <2s TTI on 4G networks
- Lazy load images with `next/image`
- Minimize client-side JavaScript
- Use static generation where possible

### Vietnamese Localization

- Default locale: vi-VN
- Currency: VND with format 75.000₫ (use `formatVND()` utility)
- All customer-facing text in Vietnamese

---

## Git Workflow

**CRITICAL:** Follow `docs/GIT_WORKFLOW.md`:

- Never commit directly to main branch
- Branch naming: `feat/<story-description>` (e.g., `feat/menu-display-page`)
- Use conventional commit messages
- Create PR after commits

---

## Testing Requirements

- Component tests with React Testing Library
- Test mobile viewports (375px, 414px)
- Test Vietnamese text rendering

---

## Dependencies

- **Requires:** `api` repo for menu data endpoints
- **Requires:** `contracts` repo for shared TypeScript types (@localstore/contracts)
- **Deployment:** Independent to Vercel

---

## Related Documentation

- [Wireframes & UX Flow](https://github.com/localstore-platform/specs/blob/v1.1-specs/design/wireframes-ux-flow.md)
- [API Specification](https://github.com/localstore-platform/specs/blob/v1.1-specs/architecture/api-specification.md)
- [Vietnam Market Strategy](https://github.com/localstore-platform/specs/blob/v1.1-specs/research/vietnam-market-strategy.md)
