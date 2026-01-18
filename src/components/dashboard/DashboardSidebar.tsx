import { useState } from 'react';

import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { LayoutDashboard, LeafIcon, LogOutIcon, PackageIcon, UsersIcon } from 'lucide-react';
import { toast } from 'sonner';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { adminSupabaseClient } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/storage/auth';

import { Spinner } from '../ui/spinner';

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/admin',
  },
  {
    icon: LeafIcon,
    label: 'Products',
    href: '/admin/products',
  },
  {
    icon: UsersIcon,
    label: 'Users',
    href: '/admin/users',
  },
  {
    icon: PackageIcon,
    label: 'Orders',
    href: '/admin/orders',
  },
];

export function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearAdmin } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const { error } = await adminSupabaseClient.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      clearAdmin();
      navigate({ to: '/admin/login' });
    }
    setIsLoading(false);
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/50">
        <div className="flex items-center gap-3 px-2 py-3 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <img src="/appicon.png" alt="Fresh Logo" className="h-6 w-6" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <h1 className="text-sm font-semibold leading-none">Fresh Dashboard</h1>
            <span className="text-xs text-sidebar-foreground/60 mt-0.5">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map(item => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                  <Link
                    to={item.href}
                    className={cn('gap-3', isActive(item.href) && 'font-medium')}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              {isLoading ? <Spinner className="h-4 w-4" /> : <LogOutIcon className="h-4 w-4" />}
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
