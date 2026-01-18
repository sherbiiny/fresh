import { Edit, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DataTable } from '../DataTable';

import type { Product } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

type ProductsTableProps = {
  products: Product[];
  isLoadingProducts: boolean;
  setEditingProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  isDeletingProduct: boolean;
};

export function ProductsTable({
  products,
  isLoadingProducts,
  setEditingProduct,
  deleteProduct,
  isDeletingProduct,
}: ProductsTableProps) {
  const columns: ColumnDef<Product>[] = [
    {
      header: 'Image',
      accessorKey: 'image',
      cell: ({ row }) => {
        const image = row.getValue('image') || '/appicon.png';

        return (
          <div className="w-10 h-10 overflow-hidden">
            <img
              src={image as string}
              alt={row.getValue('title') as string}
              className="w-full h-full object-cover"
            />
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
        const price =
          typeof row.getValue('price') === 'number'
            ? (row.getValue('price') as number)
            : parseFloat(row.getValue('price') as string);
        return <div className="font-semibold">${price.toFixed(2)}</div>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-primary"
              onClick={() => setEditingProduct(product)}
            >
              <Edit className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={() => deleteProduct(product.id)}
              disabled={isDeletingProduct}
            >
              <Trash className="size-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={products ?? []} isLoading={isLoadingProducts} />;
}
