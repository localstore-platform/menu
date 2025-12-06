/**
 * Menu API Client
 * Story 3.1: API Integration with Menu Website
 *
 * Fetches menu data from the LocalStore API and transforms
 * snake_case DTO responses to camelCase for UI components.
 */

import type { ApiError } from '@localstore/contracts';
import type {
  PublicMenuResponseDto,
  MenuCategoryDto,
  MenuItemDto,
  MenuStoreInfoDto,
  MenuData,
  MenuStore,
  MenuCategory,
  MenuItem,
} from '@/lib/types/menu';

/**
 * API base URL from environment variable
 * Falls back to localhost:8080 for development
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

/**
 * Custom error class for API errors
 */
export class MenuApiError extends Error {
  code: string;
  details?: Record<string, unknown>;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'MenuApiError';
    this.code = error.code;
    this.details = error.details;
  }
}

/**
 * Transform store DTO (snake_case) to UI model (camelCase)
 */
function transformStore(dto: MenuStoreInfoDto): MenuStore {
  return {
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
    logoUrl: dto.logo_url,
    primaryColor: dto.primary_color,
    businessType: dto.business_type,
  };
}

/**
 * Transform menu item DTO (snake_case) to UI model (camelCase)
 */
function transformMenuItem(dto: MenuItemDto): MenuItem {
  return {
    id: dto.id,
    name: dto.name,
    nameEn: dto.name_en,
    description: dto.description,
    price: dto.price,
    compareAtPrice: dto.compare_at_price,
    currencyCode: dto.currency_code,
    imageUrl: dto.image_url,
    available: dto.available,
    isFeatured: dto.is_featured,
    isSpicy: dto.is_spicy,
    isVegetarian: dto.is_vegetarian,
    isVegan: dto.is_vegan,
    displayOrder: dto.display_order,
  };
}

/**
 * Transform category DTO (snake_case) to UI model (camelCase)
 */
function transformCategory(dto: MenuCategoryDto): MenuCategory {
  return {
    id: dto.id,
    name: dto.name,
    nameEn: dto.name_en,
    description: dto.description,
    displayOrder: dto.display_order,
    items: dto.items.map(transformMenuItem),
  };
}

/**
 * Transform full menu response DTO to UI model
 */
function transformMenuResponse(dto: PublicMenuResponseDto): MenuData {
  return {
    store: transformStore(dto.store),
    categories: dto.categories.map(transformCategory),
    totalItems: dto.total_items,
    currencyCode: dto.currency_code,
    lastUpdatedAt: dto.last_updated_at,
  };
}

/**
 * Fetches the complete menu for a tenant
 * @param tenantId - UUID of the tenant/restaurant
 * @returns MenuData with store info, categories, and items (camelCase)
 * @throws MenuApiError if the API returns an error
 */
export async function fetchMenu(tenantId: string): Promise<MenuData> {
  const url = `${API_BASE_URL}/api/v1/menu/${tenantId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      // Cache for 60 seconds on the client
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new MenuApiError({
        code: errorData.code || 'API_ERROR',
        message: errorData.message || 'Không thể tải menu. Vui lòng thử lại.',
        details: errorData.details,
      });
    }

    const dto: PublicMenuResponseDto = await response.json();
    return transformMenuResponse(dto);
  } catch (error) {
    if (error instanceof MenuApiError) {
      throw error;
    }

    // Network or other errors
    throw new MenuApiError({
      code: 'NETWORK_ERROR',
      message: 'Không thể kết nối máy chủ. Vui lòng kiểm tra kết nối mạng.',
    });
  }
}

/**
 * Fetches menu with retry logic
 * @param tenantId - UUID of the tenant/restaurant
 * @param maxRetries - Maximum number of retry attempts (default: 2)
 * @returns MenuData (camelCase)
 */
export async function fetchMenuWithRetry(
  tenantId: string,
  maxRetries: number = 2
): Promise<MenuData> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fetchMenu(tenantId);
    } catch (error) {
      lastError = error as Error;

      // Don't retry on client errors (4xx)
      if (error instanceof MenuApiError) {
        if (
          error.code === 'TENANT_NOT_FOUND' ||
          error.code === 'VALIDATION_ERROR'
        ) {
          throw error;
        }
      }

      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 500)
        );
      }
    }
  }

  throw lastError;
}
