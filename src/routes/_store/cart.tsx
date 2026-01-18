import { createFileRoute } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const Route = createFileRoute('/_store/cart')({ component: RouteComponent });

function RouteComponent() {
  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="size-6" />
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShoppingCart className="size-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Start adding items to your cart to see them here.
          </p>
          <Button onClick={() => window.history.back()}>Continue Shopping</Button>
        </CardContent>
      </Card>
    </div>
  );
}
