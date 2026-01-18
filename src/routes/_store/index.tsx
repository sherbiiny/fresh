import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

import { getProductsQuery } from '@/api/store/queries';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/storage/cart';

import type { Product } from '@/types';

export const Route = createFileRoute('/_store/')({ component: RouteComponent });

function RouteComponent() {
  const { data: products, isLoading } = useQuery({
    ...getProductsQuery({ search: '', category: 'all' }),
  });

  const { addItem } = useCart();

  const handleAddItem = (product: Product) => {
    addItem(product);
    toast.success(`${product.title} added to cart`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto h-full py-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="py-3">
              <CardHeader className="px-3 pb-2">
                <Skeleton className="w-full h-52 mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full" />
              </CardHeader>
              <CardContent className="px-3">
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <p className="text-sm text-muted-foreground">No products available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {products.map(product => {
          const isFruit = product.category === 'fruit';
          return (
            <Card key={product.id} className="py-3 gap-2">
              <CardHeader className="px-3">
                <div className="w-full h-52 overflow-hidden rounded-lg mb-2 bg-muted">
                  <img
                    src={product.image || '/appicon.png'}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </CardHeader>
              <CardContent className="px-3">
                <div className="mb-4">
                  <CardTitle className="text-sm line-clamp-2">{product.title}</CardTitle>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className={`text-xs capitalize ${
                      isFruit
                        ? 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800'
                        : 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                    }`}
                  >
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">${product.price.toFixed(2)}</span>
                    <Button size="icon-sm" variant="outline" onClick={() => handleAddItem(product)}>
                      <ShoppingCart className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
