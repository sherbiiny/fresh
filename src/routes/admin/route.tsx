import { useEffect, useState } from 'react';

import { createFileRoute, Outlet } from '@tanstack/react-router';

import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { adminSupabaseClient } from '@/lib/supabase';
import { useAuthStore } from '@/storage/auth';

export const Route = createFileRoute('/admin')({ component: RouteComponent });

function RouteComponent() {
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

  return <div>{ready ? <Outlet /> : <LoadingOverlay />}</div>;
}
