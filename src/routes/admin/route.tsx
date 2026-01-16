import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { adminSupabaseClient } from '@/lib/supabase';
import { useAuthStore } from '@/storage/auth';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/admin')({ component: RouteComponent });

function RouteComponent() {
  const [ready, setReady] = useState(false);

  const { setAdmin } = useAuthStore();

  const checkSession = async () => {
    const { data } = await adminSupabaseClient.auth.getSession();
    if (data.session) setAdmin(data.session.user);
    setReady(true);
  };

  useEffect(() => {
    checkSession();
  }, []);

  return <div>{ready ? <Outlet /> : <LoadingOverlay />}</div>;
}
