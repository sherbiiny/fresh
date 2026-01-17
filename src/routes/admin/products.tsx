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
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: 'Price',
    accessorKey: 'price',
  },
]

function RouteComponent() {
  const { data: products } = useQuery(getProductsQuery());
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
      <DataTable columns={columns} data={products ?? []} />
      <AddProductModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  )
}
