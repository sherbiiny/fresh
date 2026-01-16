import { LoginForm } from '@/components/login-form';
import { loginAdmin } from '@/lib/auth';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuthStore } from '@/storage/auth';

export const Route = createFileRoute('/admin/login')({ component: RouteComponent });

function RouteComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginAdmin: loginAdminStore } = useAuthStore();

  const onSubmit = async () => {
    setIsLoading(true);
    const admin = await loginAdmin(username, password);
    loginAdminStore(admin);
    setIsLoading(false);
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
