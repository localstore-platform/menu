/**
 * Menu Types
 * Re-exports from @localstore/contracts with UI-friendly adapters
 *
 * The API returns snake_case format from contracts.
 * Components use camelCase for React conventions.
 */

// Re-export contract types (snake_case - for API layer)
export type {
  PublicMenuResponse as PublicMenuResponseDto,
  MenuCategoryDto,
  MenuItemDto,
  MenuStoreInfoDto,
  ApiError,
} from '@localstore/contracts';

/**
 * UI-friendly types (camelCase - for components)
 * These are transformed from API DTOs for React component consumption
 */

/**
 * Store information for UI display
 */
export interface MenuStore {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  primaryColor?: string | null;
  businessType?: string | null;
}

/**
 * Menu item for UI display
 */
export interface MenuItem {
  id: string;
  name: string;
  nameEn?: string | null;
  description?: string | null;
  price: number;
  compareAtPrice?: number | null;
  currencyCode: string;
  imageUrl?: string | null;
  available: boolean;
  isFeatured?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  displayOrder: number;
}

/**
 * Menu category with items for UI display
 */
export interface MenuCategory {
  id: string;
  name: string;
  nameEn?: string | null;
  description?: string | null;
  displayOrder: number;
  items: MenuItem[];
}

/**
 * Complete menu data for UI consumption
 */
export interface MenuData {
  store: MenuStore;
  categories: MenuCategory[];
  totalItems: number;
  currencyCode: string;
  lastUpdatedAt: string;
}
