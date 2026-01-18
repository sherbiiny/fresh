import { Badge } from '@/components/ui/badge';

import { DataTable } from '../DataTable';

import type { Order } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

type OrdersTableProps = {
  orders: Order[];
  isLoadingOrders: boolean;
};

export function OrdersTable({ orders, isLoadingOrders }: OrdersTableProps) {
  const columns: ColumnDef<Order>[] = [
    {
      header: 'Order ID',
      accessorKey: 'id',
      cell: ({ row }) => <div className="font-medium">#{row.getValue('id')}</div>,
    },
    {
      header: 'Customer',
      accessorKey: 'customer',
      cell: ({ row }) => {
        const customer = row.original.customer;
        return (
          <div>
            <div className="font-medium">{customer?.name}</div>
            <div className="text-sm text-muted-foreground">{customer?.email}</div>
          </div>
        );
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const statusColors = {
          pending:
            'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
          completed:
            'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
          cancelled:
            'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
        };
        return (
          <Badge
            variant="secondary"
            className={`capitalize ${statusColors[status as keyof typeof statusColors]}`}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      header: 'Total',
      accessorKey: 'total',
      cell: ({ row }) => {
        const total =
          typeof row.getValue('total') === 'number'
            ? (row.getValue('total') as number)
            : parseFloat(row.getValue('total') as string);
        return <div className="font-semibold">${total.toFixed(2)}</div>;
      },
    },
    {
      header: 'Items',
      accessorKey: 'orderItems',
      cell: ({ row }) => {
        const orderItems = row.getValue('orderItems') as Order['orderItems'];
        const itemCount = orderItems?.length || 0;
        return (
          <div className="text-muted-foreground">
            {itemCount} item{itemCount !== 1 ? 's' : ''}
          </div>
        );
      },
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return (
          <div className="text-muted-foreground">
            {date.toLocaleDateString()}{' '}
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: () => {
        // TODO: Add actions
        return null;
      },
    },
  ];

  return <DataTable columns={columns} data={orders ?? []} isLoading={isLoadingOrders} />;
}
