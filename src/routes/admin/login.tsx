import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

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

// this component might be a huge overkill for this simple login page.
function RouteComponent() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setAdmin } = useAuthStore();
  const navigate = useNavigate();

  // TODO: maybe use react-query mutation here
  const onSubmit = async (formData: LoginSchema) => {
    try {
      setIsLoading(true);
      const { error, data } = await adminSupabaseClient.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      if (data.user?.app_metadata?.role !== 'admin') {
        await adminSupabaseClient.auth.signOut();
        throw new Error('Invalid credentials');
      }

      setAdmin(data.user);
      navigate({ to: '/admin' });
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Login to your account</CardTitle>
            <CardDescription>
              Enter your email and password
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? <Spinner /> : 'Login'}
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
