import { useLocation } from '@tanstack/react-router';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeSwitch } from '@/components/ui/theme-switch';

const getPageTitle = (pathname: string): string => {
  if (pathname === '/admin' || pathname === '/admin/') return 'Dashboard';
  if (pathname.startsWith('/admin/products')) return 'Products';
  if (pathname.startsWith('/admin/customers')) return 'Customers';
  if (pathname.startsWith('/admin/orders')) return 'Orders';
  return 'Dashboard';
};

export function DashboardNavbar() {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4">
        <SidebarTrigger />
        <div className="flex flex-1 items-center">
          <h1 className="text-base font-semibold">{pageTitle}</h1>
        </div>
        <ThemeSwitch />
      </div>
    </header>
  );
}
