'use client';

/**
 * MenuItem Component
 * Story 1.1: Menu Display Page
 *
 * Displays a single menu item with name, description, price, and badges.
 * Uses types from @localstore/contracts via lib/types/menu.ts
 */

import { formatVND } from '@localstore/contracts';
import type { MenuItem as MenuItemType } from '@/lib/types/menu';

interface MenuItemProps {
  item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
  // Get price display with optional compare-at price
  const getPriceDisplay = () => {
    const priceStr = formatVND(item.price);
    return priceStr;
  };

  return (
    <article
      className={`flex gap-3 p-3 rounded-lg border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md active:scale-[0.99] min-h-[72px] ${
        !item.available ? 'opacity-60' : ''
      }`}
    >
      {/* Image placeholder or actual image - smaller on 320px screens */}
      <div className="shrink-0 w-16 h-16 xs:w-20 xs:h-20 rounded-lg bg-gray-100 overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
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
            {!item.available && (
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

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary-600 vnd-price">
              {getPriceDisplay()}
            </span>
            {/* Show original price if discounted */}
            {item.compareAtPrice && item.compareAtPrice > item.price && (
              <span className="text-sm text-gray-400 line-through">
                {formatVND(item.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
