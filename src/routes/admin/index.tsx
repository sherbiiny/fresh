import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/')({ component: RouteComponent });

function RouteComponent() {
  return (
    <div>
      <h1>This is the admin index</h1>
    </div>
  );
}
