import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

import { deleteProductMutation } from '@/api/mutations';
import { getProductsQuery } from '@/api/queries';
import { AddProductModal } from '@/components/dashboard/products/AddProductModal';
import { ProductsTable } from '@/components/dashboard/products/ProductsTable';
import { UpdateProductModal } from '@/components/dashboard/products/UpdateProductModal';
import { Button } from '@/components/ui/button';

import type { Product } from '@/types';

export const Route = createFileRoute('/admin/products')({ component: RouteComponent });

function RouteComponent() {
  const { data: products, isLoading: isLoadingProducts } = useQuery(getProductsQuery());
  const { mutate: deleteProduct, isPending: isDeletingProduct } =
    useMutation(deleteProductMutation());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Manage Products</h1>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="size-4" />
          Add Product
        </Button>
      </div>
      <ProductsTable
        products={products ?? []}
        isLoadingProducts={isLoadingProducts}
        setEditingProduct={setEditingProduct}
        deleteProduct={deleteProduct}
        isDeletingProduct={isDeletingProduct}
      />
      <AddProductModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <UpdateProductModal setEditingProduct={setEditingProduct} editingProduct={editingProduct} />
    </div>
  );
}
