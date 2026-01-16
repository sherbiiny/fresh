import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_user')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>This is the buyer layout</h1>
      <Outlet />
    </div>
  );
}
