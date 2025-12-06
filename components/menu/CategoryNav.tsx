'use client';

/**
 * CategoryNav Component
 * Story 1.1: Menu Display Page
 *
 * Sticky category navigation tabs for quick scrolling to sections.
 * Uses types from @localstore/contracts via lib/types/menu.ts
 */

import { useEffect, useState, useRef } from 'react';
import type { MenuCategory } from '@/lib/types/menu';

interface CategoryNavProps {
  categories: MenuCategory[];
  activeCategory?: string;
  onCategoryClick: (categoryId: string) => void;
}

export function CategoryNav({
  categories,
  activeCategory,
  onCategoryClick,
}: CategoryNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  // Check scroll position for shadows
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const checkScroll = () => {
      setShowLeftShadow(nav.scrollLeft > 0);
      setShowRightShadow(nav.scrollLeft < nav.scrollWidth - nav.clientWidth - 1);
    };

    checkScroll();
    nav.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      nav.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [categories]);

  // Scroll active category into view
  useEffect(() => {
    if (!activeCategory || !navRef.current) return;

    const activeButton = navRef.current.querySelector(
      `[data-category-id="${activeCategory}"]`
    );
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeCategory]);

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="relative">
        {/* Left shadow indicator */}
        {showLeftShadow && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        )}

        {/* Right shadow indicator */}
        {showRightShadow && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />
        )}

        {/* Scrollable nav */}
        <nav
          ref={navRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3"
          role="tablist"
          aria-label="Danh mục menu"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                data-category-id={category.id}
                onClick={() => onCategoryClick(category.id)}
                role="tab"
                aria-selected={isActive}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-1.5 text-xs opacity-75">
                  ({category.items.length})
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
