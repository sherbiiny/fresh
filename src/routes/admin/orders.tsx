import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Search } from 'lucide-react';

import { getOrdersQuery } from '@/api/queries';
import { OrdersTable } from '@/components/dashboard/orders/OrdersTable';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { orderFilterSchema, type OrderFilterSchema } from '@/schemas/orders';

export const Route = createFileRoute('/admin/orders')({
  component: RouteComponent,
  validateSearch: orderFilterSchema.parse,
});

function RouteComponent() {
  const filterQuery = Route.useSearch();
  const { data: orders, isLoading: isLoadingOrders } = useQuery(getOrdersQuery(filterQuery));

  const navigate = Route.useNavigate();

  const handleFilterChange = (filter: OrderFilterSchema) =>
    navigate({
      search: filter,
      replace: true,
    });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFilterChange({ ...filterQuery, search: e.target.value });

  const handleStatusChange = (status: string) => handleFilterChange({ ...filterQuery, status });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Manage Orders</h1>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-initial sm:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by customer name or email..."
              className="pl-9 pr-4"
              value={filterQuery.search || ''}
              onChange={handleSearch}
            />
          </div>
          <Select value={filterQuery.status || 'all'} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <OrdersTable orders={orders ?? []} isLoadingOrders={isLoadingOrders} />
    </div>
  );
}
