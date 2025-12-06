/**
 * Vietnamese Currency Formatter
 * Story 1.2: VND Currency Formatter
 *
 * Formats numbers to Vietnamese Dong (VND) display format
 * Example: 75000 → "75.000₫"
 */

/**
 * Formats a number as Vietnamese Dong currency
 * @param amount - The amount in VND (no decimals, smallest unit)
 * @returns Formatted string like "75.000₫"
 *
 * @example
 * formatVND(75000)    // "75.000₫"
 * formatVND(1500000)  // "1.500.000₫"
 * formatVND(0)        // "0₫"
 * formatVND(undefined) // "—"
 */
export function formatVND(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '—';
  }

  if (amount === 0) {
    return '0₫';
  }

  // Handle negative numbers
  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);

  // Format with Vietnamese thousands separator (.)
  const formatted = absoluteAmount.toLocaleString('vi-VN');

  return `${isNegative ? '-' : ''}${formatted}₫`;
}

/**
 * Formats a price range (e.g., for items with variants)
 * @param minPrice - Minimum price
 * @param maxPrice - Maximum price (optional)
 * @returns Formatted price range like "65.000₫ - 90.000₫" or just "75.000₫"
 */
export function formatVNDRange(
  minPrice: number,
  maxPrice?: number
): string {
  if (maxPrice === undefined || maxPrice === minPrice) {
    return formatVND(minPrice);
  }

  return `${formatVND(minPrice)} - ${formatVND(maxPrice)}`;
}

/**
 * Calculates price with variant adjustment
 * @param basePrice - The base price of the item
 * @param adjustment - The price adjustment (can be negative)
 * @returns The final price
 */
export function calculateVariantPrice(
  basePrice: number,
  adjustment: number
): number {
  return basePrice + adjustment;
}
