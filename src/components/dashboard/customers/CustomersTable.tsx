import { DataTable } from '../DataTable';

import type { Customer } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

type CustomersTableProps = {
  customers: Customer[];
  isLoadingCustomers: boolean;
};

export function CustomersTable({ customers, isLoadingCustomers }: CustomersTableProps) {
  const columns: ColumnDef<Customer>[] = [
    {
      header: 'Avatar',
      accessorKey: 'avatar',
      cell: ({ row }) => {
        const avatar = row.getValue('avatar') || '/appicon.png';
        const name = row.getValue('name') as string;

        return (
          <div className="w-10 h-10 p-1 overflow-hidden rounded-full">
            <img src={avatar as string} alt={name} className="w-full h-full object-contain" />
          </div>
        );
      },
    },
    {
      header: 'Name',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="font-medium max-w-[200px] truncate" title={row.getValue('name')}>
          {row.getValue('name')}
        </div>
      ),
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate text-muted-foreground" title={row.getValue('email')}>
          {row.getValue('email')}
        </div>
      ),
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt') as string);
        return <div className="text-muted-foreground">{date.toLocaleDateString()}</div>;
      },
    },
  ];

  return <DataTable columns={columns} data={customers ?? []} isLoading={isLoadingCustomers} />;
}
