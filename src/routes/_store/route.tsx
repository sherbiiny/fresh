import { useEffect, useState } from 'react';

import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';

import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { storeSupabaseClient } from '@/lib/supabase';
import { useAuthStore } from '@/storage/auth';

import { StoreNavbar } from '@/components/store/StoreNavbar';

export const Route = createFileRoute('/_store')({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const isAuthScreen =
    location.pathname.includes('/login') || location.pathname.includes('/register');

  const [ready, setReady] = useState(false);
  const { setUser } = useAuthStore();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await storeSupabaseClient.auth.getSession();
      if (data.session) setUser(data.session.user);
      setReady(true);
    };

    checkSession();
  }, [setUser]);

  return (
    <div className="h-screen w-full flex flex-col">
      {!isAuthScreen && <StoreNavbar />}
      <main className={isAuthScreen ? 'flex-1' : 'flex-1 p-4'}>
        {ready ? <Outlet /> : <LoadingOverlay />}
      </main>
    </div>
  );
}
