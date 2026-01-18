import { createFileRoute, Outlet } from '@tanstack/react-router';

import { CustomerNavbar } from '@/components/customer/CustomerNavbar';

export const Route = createFileRoute('/_customer')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-full flex flex-col">
      <CustomerNavbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
