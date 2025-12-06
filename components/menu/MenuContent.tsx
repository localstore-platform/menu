'use client';

/**
 * MenuContent Client Component
 * Story 1.1: Menu Display Page + Story 3.1: API Integration
 * Story 4.1: Mobile Optimization
 *
 * Client component that handles menu display with category navigation
 * and intersection observer for active category tracking.
 * Optimized for mobile with lazy loading and reduced re-renders.
 * Uses types from @localstore/contracts via lib/types/menu.ts
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  MenuItem,
  CategoryNav,
  MenuSkeleton,
  MenuError,
  MenuNotFound,
} from '@/components/menu';
import { fetchMenuWithRetry, MenuApiError } from '@/lib/api/menu-client';
import type { MenuData } from '@/lib/types/menu';

interface MenuContentProps {
  tenantId: string;
}

export function MenuContent({ tenantId }: MenuContentProps) {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | undefined>();

  // Refs for category sections
  const categoryRefs = useRef<Map<string, HTMLElement>>(new Map());
  
  // Flag to temporarily disable intersection observer during programmatic scroll
  const isScrollingRef = useRef(false);

  // Fetch menu data
  const loadMenu = useCallback(async () => {
    setLoading(true);
    setError(null);
    setNotFound(false);

    try {
      const data = await fetchMenuWithRetry(tenantId);
      setMenuData(data);

      // Set first category as active
      if (data.categories.length > 0) {
        setActiveCategory(data.categories[0].id);
      }
    } catch (err) {
      if (err instanceof MenuApiError) {
        if (err.code === 'TENANT_NOT_FOUND') {
          setNotFound(true);
        } else {
          setError(err.message);
        }
      } else {
        setError('Không thể tải menu. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  // Load menu on mount
  useEffect(() => {
    loadMenu();
  }, [loadMenu]);

  // Set up intersection observer for active category tracking
  // Debounced to reduce re-renders on scroll
  useEffect(() => {
    if (!menuData) return;

    let timeoutId: NodeJS.Timeout | null = null;
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip if we're in the middle of a programmatic scroll
        if (isScrollingRef.current) return;
        
        // Debounce the active category update
        if (timeoutId) clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
          // Skip again in case scrolling started during debounce
          if (isScrollingRef.current) return;
          
          // Find the first visible category
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const categoryId = entry.target.getAttribute('data-category-id');
              if (categoryId) {
                setActiveCategory(categoryId);
                break;
              }
            }
          }
        }, 100); // 100ms debounce
      },
      {
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0,
      }
    );

    // Observe all category sections
    categoryRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [menuData]);

  // Handle category click - scroll to section
  const handleCategoryClick = (categoryId: string) => {
    const element = categoryRefs.current.get(categoryId);
    if (element) {
      // Immediately set the active category for instant feedback
      setActiveCategory(categoryId);
      
      // Disable intersection observer during scroll animation
      isScrollingRef.current = true;
      
      const headerOffset = 120; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      // Re-enable intersection observer after scroll animation completes
      // Using 500ms as smooth scroll typically takes ~300-400ms
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  };

  // Register category section ref
  const setCategoryRef = (categoryId: string, element: HTMLElement | null) => {
    if (element) {
      categoryRefs.current.set(categoryId, element);
    } else {
      categoryRefs.current.delete(categoryId);
    }
  };

  // Loading state
  if (loading) {
    return <MenuSkeleton />;
  }

  // Not found state
  if (notFound) {
    return <MenuNotFound />;
  }

  // Error state
  if (error) {
    return <MenuError message={error} onRetry={loadMenu} />;
  }

  // No data
  if (!menuData) {
    return <MenuError message="Không có dữ liệu menu." onRetry={loadMenu} />;
  }

  const { store, categories } = menuData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Store Header */}
      <header className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Store logo */}
          {store.logoUrl && (
            <img
              src={store.logoUrl}
              alt={store.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <div>
            <h1 className="text-xl font-bold text-gray-900">{store.name}</h1>
            {store.businessType && (
              <p className="text-sm text-gray-500">{store.businessType}</p>
            )}
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />

      {/* Menu Content */}
      <main className="px-4 py-6">
        <div className="space-y-8">
          {categories.map((category) => (
            <section
              key={category.id}
              ref={(el) => setCategoryRef(category.id, el)}
              data-category-id={category.id}
              aria-labelledby={`category-${category.id}`}
            >
              {/* Category Header */}
              <div className="mb-4">
                <h2
                  id={`category-${category.id}`}
                  className="text-lg font-semibold text-gray-900"
                >
                  {category.name}
                  {category.nameEn && (
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      {category.nameEn}
                    </span>
                  )}
                </h2>
                {category.description && (
                  <p className="mt-1 text-sm text-gray-600">
                    {category.description}
                  </p>
                )}
              </div>

              {/* Menu Items */}
              <div className="space-y-3">
                {category.items.length > 0 ? (
                  category.items.map((item) => (
                    <MenuItem key={item.id} item={item} />
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic py-4 text-center">
                    Chưa có món ăn trong danh mục này
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Empty state */}
        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Menu đang được cập nhật...</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-4 py-6 text-center">
        <p className="text-xs text-gray-400">
          Powered by LocalStore Platform
        </p>
      </footer>
    </div>
  );
}
