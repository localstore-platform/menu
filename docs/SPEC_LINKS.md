# Specification Links

This document provides curated links to relevant specifications from the [LocalStore Platform Specs Repository](https://github.com/localstore-platform/specs/tree/v1.0-specs).

## Core Specifications

### Architecture

- [API Specification](https://github.com/localstore-platform/specs/blob/v1.0-specs/architecture/api-specification.md)
  - Menu public endpoints (lines 400-600)
  - QR code session endpoints (lines 900-1000)

- [Database Schema](https://github.com/localstore-platform/specs/blob/v1.0-specs/architecture/database-schema.md)
  - Menu items schema (lines 250-350)
  - Categories schema (lines 200-250)

### Design

- [Wireframes & UX Flow](https://github.com/localstore-platform/specs/blob/v1.0-specs/design/wireframes-ux-flow.md)
  - Customer menu views (lines 200-400)
  - Mobile-first design (lines 100-200)

- [Flowchart](https://github.com/localstore-platform/specs/blob/v1.0-specs/design/flowchart.md)
  - Customer ordering flow (lines 100-300)

### Market Context

- [Vietnam Market Strategy](https://github.com/localstore-platform/specs/blob/v1.0-specs/research/vietnam-market-strategy.md)
  - Mobile optimization requirements
  - 4G performance targets (<2s TTI)
  - Currency formatting (75.000₫)

## Quick Reference

### Menu Display Requirements

- **Primary Locale**: `vi-VN`
- **Currency**: VND (Vietnamese Dong)
- **Format**: `75.000₫` (period thousands separator)
- **Performance**: Time to Interactive < 2s on 4G
- **Device Target**: Entry-level Android devices (2020+)

### API Endpoints (Public)

Refer to API Specification for detailed documentation:

- `GET /api/v1/public/menu/:tenant_slug` - Get full menu
- `GET /api/v1/public/menu/:tenant_slug/categories` - Get categories
- `GET /api/v1/public/menu/:tenant_slug/items/:item_id` - Get item details
- `POST /api/v1/public/qr-sessions` - Create QR session

### Related Repositories

- [Specs Repository](https://github.com/localstore-platform/specs) - Central specifications
- [API Backend](https://github.com/localstore-platform/api) - Go backend service
- [Admin Dashboard](https://github.com/localstore-platform/admin) - Management interface

## Development Guidelines

### Vietnamese Localization

- Use `vi-VN` locale throughout
- Format currency: `new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)`
- Date format: `DD/MM/YYYY`
- Time format: 24-hour (`HH:mm`)

### Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 2s
- Lighthouse Performance Score: > 90
- Bundle Size: < 200KB (gzipped)

### Mobile-First Design

- Viewport: 360x640px minimum
- Touch targets: 44x44px minimum
- Font size: 16px minimum (body text)
- Support for slow 4G connections

## Version

This document references specifications from tag: **v1.0-specs**

Last updated: 2025-11-25
