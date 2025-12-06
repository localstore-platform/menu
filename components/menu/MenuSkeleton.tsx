/**
 * MenuSkeleton Component
 * Story 1.1: Menu Display Page
 *
 * Loading skeleton (shimmer effect) for the menu page
 */

export function MenuSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>

      {/* Category nav skeleton */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex gap-2 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 rounded-full w-24 shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Category sections skeleton */}
      <div className="px-4 py-6 space-y-8">
        {[1, 2].map((section) => (
          <div key={section}>
            {/* Category title */}
            <div className="h-6 bg-gray-200 rounded w-32 mb-4" />

            {/* Menu items */}
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <MenuItemSkeleton key={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuItemSkeleton() {
  return (
    <div className="flex gap-3 p-3 rounded-lg border border-gray-100 bg-white">
      {/* Image placeholder */}
      <div className="w-20 h-20 rounded-lg bg-gray-200 shrink-0" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        {/* Subtitle */}
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
        {/* Description */}
        <div className="h-4 bg-gray-200 rounded w-full mb-1" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-20" />
      </div>
    </div>
  );
}

/**
 * Category section skeleton for partial loading
 */
export function CategorySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <MenuItemSkeleton key={item} />
        ))}
      </div>
    </div>
  );
}
