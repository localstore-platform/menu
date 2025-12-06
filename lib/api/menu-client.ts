/**
 * Menu API Client
 * Story 3.1: API Integration with Menu Website
 *
 * Fetches menu data from the LocalStore API
 */

import type { PublicMenuResponse, ApiError } from '@/lib/types/menu';

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
 * Fetches the complete menu for a tenant
 * @param tenantId - UUID of the tenant/restaurant
 * @returns PublicMenuResponse with store info, categories, and items
 * @throws MenuApiError if the API returns an error
 */
export async function fetchMenu(tenantId: string): Promise<PublicMenuResponse> {
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

    const data: PublicMenuResponse = await response.json();
    return data;
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
 * @returns PublicMenuResponse
 */
export async function fetchMenuWithRetry(
  tenantId: string,
  maxRetries: number = 2
): Promise<PublicMenuResponse> {
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
