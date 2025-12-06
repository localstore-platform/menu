/**
 * Dynamic Menu Page
 * Story 1.1: Menu Display Page
 *
 * Route: /[tenant]/menu
 * Displays the public menu for a specific tenant/restaurant
 */

import type { Metadata } from 'next';
import { MenuContent } from '@/components/menu/MenuContent';

interface MenuPageProps {
  params: Promise<{
    tenant: string;
  }>;
}

/**
 * Generate metadata for the menu page
 */
export async function generateMetadata({
  params,
}: MenuPageProps): Promise<Metadata> {
  const { tenant: _tenant } = await params;

  return {
    title: `Menu | LocalStore`,
    description: 'Xem thực đơn nhà hàng',
    openGraph: {
      title: `Menu | LocalStore`,
      description: 'Xem thực đơn nhà hàng',
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
