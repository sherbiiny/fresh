import { createFileRoute, redirect } from '@tanstack/react-router';

import { adminSupabaseClient } from '@/lib/supabase';

export const Route = createFileRoute('/admin/')({
  beforeLoad: async () => {
    const { data } = await adminSupabaseClient.auth.getSession();
    if (!data.session || data.session.user.app_metadata.role !== 'admin') 
      return redirect({ to: '/admin/login' });
  },
  component: RouteComponent,
});

function RouteComponent() {

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
