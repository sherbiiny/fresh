import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { loginAdminMutation } from '@/api/mutations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup , Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { adminSupabaseClient } from '@/lib/supabase';
import { loginSchema, type LoginSchema } from '@/schemas/auth';
import { useAuthStore } from '@/storage/auth';

export const Route = createFileRoute('/admin/login')({
  beforeLoad: async () => {
    const { data } = await adminSupabaseClient.auth.getSession();
    if (data.session && data.session.user.app_metadata.role === 'admin') return redirect({ to: '/admin' });
    await adminSupabaseClient.auth.signOut();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const [showPassword, setShowPassword] = useState(false);

  const { setAdmin } = useAuthStore();
  const navigate = useNavigate();

  const { mutate: loginAdmin, isPending } = useMutation({
    ...loginAdminMutation(),
    onSuccess: (user) => {
      setAdmin(user);
      navigate({ to: '/admin' });
    },
  });

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Login to your account</CardTitle>
            <CardDescription>
              Enter your email and password
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <form onSubmit={form.handleSubmit(data => loginAdmin(data))} aria-disabled={isPending}>
              <FieldGroup>
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input id="email" {...field} aria-invalid={fieldState.invalid} type="email" placeholder="Email" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <div className="relative">
                        <Input
                          id="password"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Field>
                  <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? <Spinner /> : 'Login'}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t pt-4">
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                to="/admin/register"
                className="text-primary font-medium hover:underline"
              >
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
