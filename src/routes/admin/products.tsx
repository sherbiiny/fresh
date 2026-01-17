import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { getProductsQuery } from '@/api/queries';
import { AddProductModal } from '@/components/dashboard/AddProductModal';
import { DataTable } from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/button';

import type { Product } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

export const Route = createFileRoute('/admin/products')({ component: RouteComponent })

const columns: ColumnDef<Product>[] = [
  {
    header: 'Image',
    accessorKey: 'image',
    cell: ({ row }) => {
      const image = row.getValue('image') || '/appicon.png';

      return (
        <div className="w-10 h-10 overflow-hidden">
          <img src={image as string} alt={row.getValue('title') as string} className="w-full h-full object-cover" />
        </div>
      );
    },
  },
  {
    header: 'Title',
    accessorKey: 'title',
    cell: ({ row }) => (
      <div className="font-medium max-w-[200px] truncate" title={row.getValue('title')}>
        {row.getValue('title')}
      </div>
    ),
  },
  {
    header: 'Description',
    accessorKey: 'description',
    cell: ({ row }) => {
      const description = row.getValue('description') as string;
      return (
        <div className="max-w-[300px] truncate text-muted-foreground" title={description}>
          {description}
        </div>
      );
    },
  },
  {
    header: 'Price',
    accessorKey: 'price',
    cell: ({ row }) => {
      const price = typeof row.getValue('price') === 'number' 
        ? row.getValue('price') as number
        : parseFloat(row.getValue('price') as string);
      return <div className="font-semibold">${price.toFixed(2)}</div>;
    },
  },
]

function RouteComponent() {
  const { data: products, isLoading } = useQuery(getProductsQuery());
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="size-4" />
          Add Product
        </Button>
      </div>
      <DataTable columns={columns} data={products ?? []} isLoading={isLoading} />
      <AddProductModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  )
}
