import { cn } from '@/lib/utils';

import { Spinner } from './spinner';

interface LoadingOverlayProps {
  className?: string;
}

function LoadingOverlay({ className }: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-background/80 backdrop-blur-sm',
        className
      )}
      aria-label="Loading"
      role="status"
    >
      <Spinner className="size-8" />
    </div>
  );
}

export { LoadingOverlay };
