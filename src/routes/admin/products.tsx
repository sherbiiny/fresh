import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Plus, Search } from 'lucide-react';

import { deleteProductMutation } from '@/api/dashboard/mutations';
import { getProductsQuery } from '@/api/dashboard/queries';
import { AddProductModal } from '@/components/dashboard/products/AddProductModal';
import { ProductsTable } from '@/components/dashboard/products/ProductsTable';
import { UpdateProductModal } from '@/components/dashboard/products/UpdateProductModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { productFilterSchema, type ProductFilterSchema } from '@/schemas/products';

import type { Product } from '@/types';

export const Route = createFileRoute('/admin/products')({
  component: RouteComponent,
  validateSearch: productFilterSchema.parse,
});

function RouteComponent() {
  const filterQuery = Route.useSearch();
  const { data: products, isLoading: isLoadingProducts } = useQuery(getProductsQuery(filterQuery));
  const { mutate: deleteProduct, isPending: isDeletingProduct } =
    useMutation(deleteProductMutation());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const navigate = Route.useNavigate();

  const handleFilterChange = (filter: ProductFilterSchema) =>
    navigate({
      search: filter,
      replace: true,
    });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFilterChange({ ...filterQuery, search: e.target.value });

  const handleCategoryChange = (category: string) =>
    handleFilterChange({ ...filterQuery, category });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Manage Products</h1>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-initial sm:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-9 pr-4"
              value={filterQuery.search || ''}
              onChange={handleSearch}
            />
          </div>
          <Select value={filterQuery.category || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="fruit">Fruit</SelectItem>
              <SelectItem value="vegetable">Vegetable</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="size-4" />
            Add Product
          </Button>
        </div>
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
