# GitHub Copilot Instructions for Menu Repository

## Repository Context

This is the **menu** repository for LocalStore Platform - a public-facing Next.js 14 application that displays restaurant menus for Vietnamese small businesses.

**Key Information:**

- **Type**: Next.js 14 Static Site Generation (App Router)
- **Target Market**: Vietnamese small businesses (restaurants, street food vendors)
- **Primary Locale**: `vi-VN`
- **Currency**: VND (Vietnamese Dong)
- **Deployment**: Vercel (static export)
- **Domain Pattern**: `{tenant}.lsp.menu`

## Specification-Driven Development

All development must follow specifications from the [specs repository](https://github.com/localstore-platform/specs/tree/v1.0-specs).

**Before implementing features:**

1. Check `docs/SPEC_LINKS.md` for relevant specifications
2. Review the linked spec sections
3. Ensure implementation matches spec requirements
4. Use spec terminology and patterns

## Code Style Guidelines

### TypeScript

- Use TypeScript strict mode
- Prefer interfaces over types for object shapes
- Use explicit return types for functions
- Avoid `any` - use `unknown` if type is truly unknown

### React Components

- Use functional components with hooks
- Prefer Server Components (default in App Router)
- Use Client Components only when needed (`'use client'`)
- Keep components small and focused (< 150 lines)
- Use composition over prop drilling

### File Organization

```
app/
  [tenant]/           # Tenant-specific routes
    page.tsx          # Server Component
    layout.tsx        # Shared layout
  components/         # Shared components
  lib/
    api/              # API client functions
    utils/            # Utility functions
    types/            # TypeScript types
```

### Naming Conventions

- Components: PascalCase (`MenuCard.tsx`)
- Files: kebab-case (`format-currency.ts`)
- Functions: camelCase (`formatCurrency`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

## Vietnamese Localization

### Currency Formatting

Always use Vietnamese number formatting:

```typescript
// Correct
const formatted = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
}).format(price);
// Output: 75.000₫

// Never use
const wrong = `${price.toFixed(2)} VND`;
```

### Date and Time

- Date format: `DD/MM/YYYY`
- Time format: 24-hour (`HH:mm`)
- Use `vi-VN` locale with Intl.DateTimeFormat

### Text Content

- All user-facing text should be in Vietnamese
- Use proper Vietnamese diacritics
- Consider cultural context (street food terms, meal times)

## Performance Requirements

### Critical Metrics

- **Time to Interactive**: < 2s on 4G
- **First Contentful Paint**: < 1.5s
- **Lighthouse Performance**: > 90
- **Bundle Size**: < 200KB gzipped

### Optimization Strategies

- Use Next.js Image component for all images
- Implement code splitting for heavy components
- Lazy load below-the-fold content
- Use static generation whenever possible
- Minimize client-side JavaScript

### Mobile-First

- Test on 360x640px viewport minimum
- Touch targets: 44x44px minimum
- Font size: 16px minimum for body text
- Optimize for slow 4G connections

## API Integration

### Base URL

Use environment variable for API base URL:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
```

### Public Endpoints

All API calls use public endpoints (no authentication):

- `GET /api/v1/public/menu/:tenant_slug`
- `GET /api/v1/public/menu/:tenant_slug/categories`
- `GET /api/v1/public/menu/:tenant_slug/items/:item_id`

### Error Handling

- Always handle network errors gracefully
- Show user-friendly Vietnamese error messages
- Implement fallbacks for missing images/data
- Log errors for debugging (development only)

## Styling Guidelines

### Tailwind CSS

- Use Tailwind utility classes
- Define custom design tokens in `tailwind.config.js`
- Use Vietnamese design tokens (colors, fonts)
- Mobile-first responsive design

### Design Tokens

```javascript
// Vietnamese-specific design tokens
colors: {
  primary: '#FF6B35',      // Warm orange
  secondary: '#004E89',    // Deep blue
  accent: '#F7931E',       // Golden yellow
}
```

### Accessibility

- Semantic HTML elements
- Proper heading hierarchy
- Alt text for images (in Vietnamese)
- Keyboard navigation support

## Testing Considerations

When implementing features, consider:

- **Device Testing**: Test on entry-level Android devices (2020+)
- **Network Testing**: Test on slow 4G (throttled)
- **Browser Testing**: Chrome, Safari, Firefox
- **Tenant Testing**: Test with different tenant data

## Common Patterns

### Fetching Menu Data

```typescript
async function getMenu(tenantSlug: string) {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/public/menu/${tenantSlug}`,
    { next: { revalidate: 300 } } // 5 minute cache
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch menu');
  }
  
  return response.json();
}
```

### Currency Display

```typescript
function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
}
```

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src={item.image_url}
  alt={item.name}
  width={300}
  height={200}
  className="rounded-lg"
  loading="lazy"
/>
```

## Related Repositories

- **specs**: Central specifications and documentation
- **api**: Go backend service
- **admin**: Admin dashboard for managing menus

## Questions to Ask

When implementing features, verify:

1. Does this match the specifications?
2. Is this optimized for mobile 4G performance?
3. Is the Vietnamese localization correct?
4. Are we using Server Components where possible?
5. Will this work for different tenants?
6. Is the bundle size impact acceptable?

## Version

Last updated: 2025-11-25
Spec version: v1.0-specs
