import { Link } from '@tanstack/react-router';
import { ArrowLeft, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function NotFound({ basePath }: { basePath: string }) {
  const handleGoBack = () => window.history.back();

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 text-6xl font-bold text-muted-foreground">404</div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-2">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 size-4" />
            Go Back
          </Button>
          <Button asChild>
            <Link to={basePath}>
              <Home className="mr-2 size-4" />
              Go Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
