# LocalStore Platform - Menu

🌐 Public menu website for LocalStore Platform - Fast, mobile-first Next.js site for customer-facing restaurant menus. Powers `{tenant}.lsp.menu` domains with QR code support and Vietnamese formatting. Optimized for 4G on entry-level Android devices.

## Overview

This repository contains the public-facing menu application that Vietnamese small businesses use to display their restaurant menus to customers. Built with Next.js 14 and optimized for mobile devices, it provides a fast, accessible, and localized experience for viewing menus via QR codes or direct links.

**Target Market**: Vietnamese small businesses (restaurants, street food vendors, cafes)

**Key Features**:

- 🚀 Static site generation for optimal performance (<2s TTI on 4G)
- 📱 Mobile-first design (360x640px minimum viewport)
- 🇻🇳 Vietnamese localization (vi-VN locale, VND currency formatting)
- 🏷️ Multi-tenant architecture (`{tenant}.lsp.menu`)
- 📷 QR code session support
- ⚡ Lighthouse performance score > 90

## Tech Stack

- **Framework**: Next.js 14 (App Router, Static Export)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3
- **Deployment**: Vercel
- **API**: REST (public endpoints, no authentication)

## Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Access to LocalStore Platform API (see `.env.example`)

### Installation

```bash
# Clone the repository
git clone https://github.com/localstore-platform/menu.git
cd menu

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your API base URL
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production (static export)
npm run start        # Serve production build locally
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Project Structure

```markdown
menu/
├── app/                    # Next.js App Router
│   ├── [tenant]/          # Tenant-specific routes
│   ├── components/        # Shared components
│   └── lib/              # Utilities and API clients
├── public/               # Static assets
├── docs/                 # Documentation
│   └── SPEC_LINKS.md    # Specification references
├── .github/             # GitHub configuration
│   ├── CODEOWNERS
│   ├── copilot-instructions.md
│   └── ISSUE_TEMPLATE/
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Specifications

This repository follows a specification-driven development approach. All features and implementations must align with the specifications in the [specs repository](https://github.com/localstore-platform/specs/tree/v1.1-specs).

**Important Specifications**:

- [API Specification](https://github.com/localstore-platform/specs/blob/v1.1-specs/architecture/api-specification.md) - Menu public endpoints
- [Database Schema](https://github.com/localstore-platform/specs/blob/v1.1-specs/architecture/database-schema.md) - Menu items and categories
- [Wireframes & UX Flow](https://github.com/localstore-platform/specs/blob/v1.1-specs/design/wireframes-ux-flow.md) - Customer menu views
- [Vietnam Market Strategy](https://github.com/localstore-platform/specs/blob/v1.1-specs/research/vietnam-market-strategy.md) - Localization requirements

See [`docs/SPEC_LINKS.md`](docs/SPEC_LINKS.md) for a complete list of relevant specifications.

## Vietnamese Localization

### Currency Formatting

Always use Vietnamese number formatting for prices:

```typescript
const formatted = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
}).format(75000);
// Output: 75.000₫
```

### Date and Time

- Date format: `DD/MM/YYYY`
- Time format: 24-hour (`HH:mm`)
- Use `vi-VN` locale with `Intl.DateTimeFormat`

### Language

All user-facing text must be in Vietnamese with proper diacritics.

## Performance Requirements

### Critical Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2s on 4G
- **Lighthouse Performance**: > 90
- **Bundle Size**: < 200KB (gzipped)

### Testing

Test on:

- Entry-level Android devices (2020+)
- Slow 4G connections (throttled)
- Viewport: 360x640px minimum
- Browsers: Chrome, Safari, Firefox

## Contributing

1. Check [`docs/SPEC_LINKS.md`](docs/SPEC_LINKS.md) for relevant specifications
2. Review the [GitHub Copilot Instructions](.github/copilot-instructions.md)
3. Follow the code style guidelines
4. Ensure Vietnamese localization is correct
5. Test on mobile devices and slow networks
6. Submit a PR using the template

See [CODEOWNERS](.github/CODEOWNERS) for code review requirements.

## Related Repositories

- [**specs**](https://github.com/localstore-platform/specs) - Central specifications and documentation
- [**api**](https://github.com/localstore-platform/api) - Go backend service
- [**admin**](https://github.com/localstore-platform/admin) - Admin dashboard for managing menus

## License

GNU Affero General Public License v3.0 (AGPL-3.0)

This project is licensed under AGPL-3.0 to ensure that all modifications and network-accessible deployments remain open source and benefit the community.

## Support

For questions, issues, or contributions:

- 📋 [Open an issue](https://github.com/localstore-platform/menu/issues)
- 📖 [Read the specs](https://github.com/localstore-platform/specs/tree/v1.1-specs)
- 💬 Contact the maintainers via GitHub

---

**Version**: v1.1-specs | **Last Updated**: 2025-11-25
