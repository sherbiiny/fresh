import { LoginForm } from '@/components/login-form';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuthStore } from '@/storage/auth';
import { adminSupabaseClient } from '@/lib/supabase';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/login')({
  beforeLoad: async () => {
    const { data } = await adminSupabaseClient.auth.getSession();
    if (data.session) return redirect({ to: '/admin' });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAdmin } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { error, data } = await adminSupabaseClient.auth.signInWithPassword({
        email: username,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('User not found');

      setAdmin(data.user);
      navigate({ to: '/admin' });
    } catch (err) {
      // TODO: handle errors better
      console.error(err);
      toast('Error logging in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          username={username}
          password={password}
          isLoading={isLoading}
          setUsername={setUsername}
          setPassword={setPassword}
          isAdmin={true}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
