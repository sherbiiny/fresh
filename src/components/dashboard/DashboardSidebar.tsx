import { useState } from 'react';

import { Link, useNavigate } from '@tanstack/react-router';
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
} from '@/components/ui/sidebar';
import { adminSupabaseClient } from '@/lib/supabase';
import { useAuthStore } from '@/storage/auth';

import { Button } from '../ui/button';
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

  return (
    <Sidebar>
      <SidebarHeader className="mt-4">
        <div className="flex items-center gap-2">
          <img src="/appicon.png" alt="Fresh Logo" className="w-8 h-8" />
          <h1 className="text-l font-bold">Fresh Dashboard</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map(item => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <Link to={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <Button variant="outline" onClick={handleLogout} disabled={isLoading}>
            {isLoading ? <Spinner /> : <LogOutIcon />}
            Logout
          </Button>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
