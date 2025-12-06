'use client';

/**
 * MenuItem Component
 * Story 1.1: Menu Display Page
 *
 * Displays a single menu item with name, description, price, and badges
 */

import { formatVND, formatVNDRange, calculateVariantPrice } from '@/lib/utils/currency';
import type { MenuItem as MenuItemType } from '@/lib/types/menu';

interface MenuItemProps {
  item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
  // Calculate price range if variants exist
  const getPriceDisplay = () => {
    if (item.variants.length === 0) {
      return formatVND(item.price);
    }

    const prices = item.variants
      .filter((v) => v.isAvailable)
      .map((v) => calculateVariantPrice(item.price, v.priceAdjustment));

    if (prices.length === 0) {
      return formatVND(item.price);
    }

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return formatVNDRange(minPrice, maxPrice);
  };

  return (
    <article
      className={`flex gap-3 p-3 rounded-lg border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md active:scale-[0.99] min-h-[72px] ${
        !item.isAvailable ? 'opacity-60' : ''
      }`}
    >
      {/* Image placeholder or actual image - smaller on 320px screens */}
      <div className="shrink-0 w-16 h-16 xs:w-20 xs:h-20 rounded-lg bg-gray-100 overflow-hidden">
        {item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header with name and badges */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
            {item.nameEn && (
              <p className="text-xs text-gray-500 truncate">{item.nameEn}</p>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1 shrink-0">
            {item.isFeatured && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-accent-100 text-accent-700">
                ⭐
              </span>
            )}
            {item.isSpicy && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
                🌶️
              </span>
            )}
            {item.isVegetarian && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                🥬
              </span>
            )}
            {!item.isAvailable && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                Hết
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Variants preview */}
        {item.variants.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {item.variants
              .filter((v) => v.isAvailable)
              .slice(0, 3)
              .map((variant) => (
                <span
                  key={variant.id}
                  className="text-xs text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded"
                >
                  {variant.name}
                </span>
              ))}
            {item.variants.filter((v) => v.isAvailable).length > 3 && (
              <span className="text-xs text-gray-400">
                +{item.variants.filter((v) => v.isAvailable).length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-primary-600 vnd-price">
            {getPriceDisplay()}
          </span>

          {/* Add-ons indicator */}
          {item.addOns.length > 0 && (
            <span className="text-xs text-gray-500">
              +{item.addOns.length} tùy chọn
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
