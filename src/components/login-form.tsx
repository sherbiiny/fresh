import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from './ui/spinner';

type LoginFormProps = React.ComponentProps<'div'> & {
  onSubmit: (e: React.FormEvent) => void;
  username: string;
  password: string;
  isLoading: boolean;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  isAdmin: boolean;
};

export function LoginForm({
  className,
  onSubmit,
  isLoading,
  isAdmin,
  username,
  password,
  setUsername,
  setPassword,
  ...props
}: LoginFormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            {isAdmin
              ? 'Enter your username below to login to your account'
              : 'Enter your email below to login to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  required
                  autoFocus
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner /> : 'Login'}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
