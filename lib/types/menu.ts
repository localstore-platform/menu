/**
 * Menu Types
 * Based on API response from localstore-platform/api
 *
 * These types mirror the API response structure.
 * TODO: Move to @localstore/contracts when available
 */

/**
 * Store information from the public menu response
 */
export interface PublicMenuStoreInfo {
  id: string;
  businessName: string;
  businessType?: string;
  address?: string;
  phone?: string;
  locale: string;
  currency: string;
}

/**
 * Menu item variant (size options, etc.)
 */
export interface MenuItemVariant {
  id: string;
  name: string;
  nameEn?: string;
  priceAdjustment: number;
  isAvailable: boolean;
}

/**
 * Menu item add-on (extra toppings, etc.)
 */
export interface MenuItemAddOn {
  id: string;
  name: string;
  nameEn?: string;
  price: number;
  isRequired: boolean;
  maxSelections: number;
  isAvailable: boolean;
}

/**
 * Menu item image
 */
export interface MenuItemImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  altText?: string;
  isPrimary: boolean;
}

/**
 * Individual menu item
 */
export interface MenuItem {
  id: string;
  name: string;
  nameEn?: string;
  description?: string;
  descriptionEn?: string;
  price: number;
  currency: string;
  isFeatured: boolean;
  isSpicy: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isAvailable: boolean;
  thumbnailUrl?: string;
  variants: MenuItemVariant[];
  addOns: MenuItemAddOn[];
  images: MenuItemImage[];
}

/**
 * Menu category with items
 */
export interface MenuCategory {
  id: string;
  name: string;
  nameEn?: string;
  description?: string;
  displayOrder: number;
  items: MenuItem[];
}

/**
 * Response metadata
 */
export interface MenuMeta {
  timestamp: string;
  tenantId: string;
}

/**
 * Complete public menu response
 */
export interface PublicMenuResponse {
  store: PublicMenuStoreInfo;
  categories: MenuCategory[];
  meta: MenuMeta;
}

/**
 * API error response
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
