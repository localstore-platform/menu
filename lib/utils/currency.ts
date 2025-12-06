/**
 * Vietnamese Currency Utilities
 * Story 1.2: VND Currency Formatter
 *
 * Re-exports formatVND from @localstore/contracts and adds
 * additional utilities for the menu app.
 */

// Re-export the main formatter from contracts
export { formatVND, formatVNDCompact, formatVNDRange } from '@localstore/contracts';

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
