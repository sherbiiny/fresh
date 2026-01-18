import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { loginMutation } from '@/api/store/mutations';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { storeSupabaseClient } from '@/lib/supabase';
import { type LoginSchema, loginSchema } from '@/schemas/auth';
import { useAuthStore } from '@/storage/auth';

export const Route = createFileRoute('/_store/login')({
  beforeLoad: async () => {
    const { data } = await storeSupabaseClient.auth.getSession();
    console.log(data);
    if (data.session) return redirect({ to: '/' });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useAuthStore();
  const navigate = Route.useNavigate();

  const { mutate: loginCustomer, isPending } = useMutation({
    ...loginMutation(),
    onSuccess: user => {
      setUser(user);
      navigate({ to: '/' });
    },
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Login to your account</CardTitle>
            <CardDescription>Enter your email and password to continue</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <form
              onSubmit={form.handleSubmit(data => loginCustomer(data))}
              aria-disabled={isPending}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" type="email" placeholder="Email" {...form.register('email')} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="pr-10"
                      {...form.register('password')}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </Field>
                <Field>
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <Spinner /> : 'Login'}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t pt-4">
            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <a href="/register" className="text-primary hover:underline">
                Sign up
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
