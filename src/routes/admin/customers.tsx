import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Search } from 'lucide-react';

import { getCustomersQuery } from '@/api/dashboard/queries';
import { CustomersTable } from '@/components/dashboard/customers/CustomersTable';
import { Input } from '@/components/ui/input';
import { customerFilterSchema, type CustomerFilterSchema } from '@/schemas/customers';

export const Route = createFileRoute('/admin/customers')({
  component: RouteComponent,
  validateSearch: customerFilterSchema.parse,
});

function RouteComponent() {
  const filterQuery = Route.useSearch();
  const { data: customers, isLoading: isLoadingCustomers } = useQuery(
    getCustomersQuery(filterQuery)
  );

  const navigate = Route.useNavigate();

  const handleFilterChange = (filter: CustomerFilterSchema) =>
    navigate({
      search: filter,
      replace: true,
    });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFilterChange({ ...filterQuery, search: e.target.value });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Manage Customers</h1>
        <div className="relative flex-1 sm:flex-initial sm:w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            className="pl-9 pr-4"
            value={filterQuery.search || ''}
            onChange={handleSearch}
          />
        </div>
      </div>
      <CustomersTable customers={customers ?? []} isLoadingCustomers={isLoadingCustomers} />
    </div>
  );
}
