/**
 * Dynamic Menu Page
 * Story 1.1: Menu Display Page
 *
 * Route: /[tenant]/menu
 * Displays the public menu for a specific tenant/restaurant
 */

import type { Metadata } from 'next';
import { MenuContent } from '@/components/menu/MenuContent';
import { fetchMenu } from '@/lib/api/menu-client';

interface MenuPageProps {
  params: Promise<{
    tenant: string;
  }>;
}

/**
 * Generate metadata for the menu page
 * Fetches store name from API for dynamic title
 */
export async function generateMetadata({
  params,
}: MenuPageProps): Promise<Metadata> {
  const { tenant } = await params;

  // Try to fetch store name for title
  let storeName = 'Thực đơn';
  try {
    const menuData = await fetchMenu(tenant);
    storeName = menuData.store.name;
  } catch {
    // Fallback to generic title if API fails
  }

  return {
    title: storeName,
    description: `Xem thực đơn ${storeName}`,
    openGraph: {
      title: storeName,
      description: `Xem thực đơn ${storeName}`,
      type: 'website',
    },
    // Prevent indexing of dynamic tenant pages for now
    robots: {
      index: false,
      follow: true,
    },
  };
}

/**
 * Menu page component
 * Server component that renders the client MenuContent
 */
export default async function MenuPage({ params }: MenuPageProps) {
  const { tenant } = await params;

  return <MenuContent tenantId={tenant} />;
}
