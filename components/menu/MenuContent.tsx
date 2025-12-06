'use client';

/**
 * MenuContent Client Component
 * Story 1.1: Menu Display Page + Story 3.1: API Integration
 *
 * Client component that handles menu display with category navigation
 * and intersection observer for active category tracking
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
import type { PublicMenuResponse } from '@/lib/types/menu';

interface MenuContentProps {
  tenantId: string;
}

export function MenuContent({ tenantId }: MenuContentProps) {
  const [menuData, setMenuData] = useState<PublicMenuResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | undefined>();

  // Refs for category sections
  const categoryRefs = useRef<Map<string, HTMLElement>>(new Map());

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
  useEffect(() => {
    if (!menuData) return;

    const observer = new IntersectionObserver(
      (entries) => {
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

    return () => observer.disconnect();
  }, [menuData]);

  // Handle category click - scroll to section
  const handleCategoryClick = (categoryId: string) => {
    const element = categoryRefs.current.get(categoryId);
    if (element) {
      const headerOffset = 120; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
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
        <h1 className="text-xl font-bold text-gray-900">{store.businessName}</h1>
        {store.address && (
          <p className="mt-1 text-sm text-gray-600 flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {store.address}
          </p>
        )}
        {store.phone && (
          <p className="mt-1 text-sm text-gray-600 flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a href={`tel:${store.phone}`} className="hover:text-primary-600">
              {store.phone}
            </a>
          </p>
        )}
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
