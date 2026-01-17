import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { adminSupabaseClient } from '@/lib/supabase';
import { useAuthStore } from '@/storage/auth';

export const Route = createFileRoute('/admin/')({
  beforeLoad: async () => {
    const { data } = await adminSupabaseClient.auth.getSession();
    if (!data.session || data.session.user.app_metadata.role !== 'admin') return redirect({ to: '/admin/login' });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { clearAdmin } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await adminSupabaseClient.auth.signOut();
    console.log(error);
    clearAdmin();
    navigate({ to: '/admin/login' });
  };

  return (
    <div>
      <h1>This is the admin index</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
