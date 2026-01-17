import { useEffect, useState } from 'react';

import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { NotFound } from '@/components/NotFound';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { adminSupabaseClient } from '@/lib/supabase';
import { useAuthStore } from '@/storage/auth';

export const Route = createFileRoute('/admin')({ component: RouteComponent, notFoundComponent: () => <NotFound basePath={'/admin'} /> });

function RouteComponent() {
  const isLoginPage = useLocation().pathname.includes('/login');

  const [ready, setReady] = useState(false);
  const { setAdmin } = useAuthStore();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await adminSupabaseClient.auth.getSession();
      if (data.session) setAdmin(data.session.user);
      setReady(true);
    };

    checkSession();
  }, [setAdmin]);

  return (
    <div className="flex min-h-svh w-full">
      {!isLoginPage && <DashboardSidebar />}
      {!isLoginPage && <SidebarTrigger />}
      <main className="flex-1 p-8">
        {ready ? <Outlet /> : <LoadingOverlay />}
      </main>
    </div>
  );
}
