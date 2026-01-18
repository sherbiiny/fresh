import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { createOrderMutation } from '@/api/store/mutations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useAuthStore } from '@/storage/auth';
import { useCart } from '@/storage/cart';

export const Route = createFileRoute('/_store/cart')({ component: RouteComponent });

function RouteComponent() {
  const navigate = useNavigate();
  const { cart, removeItem, updateItemAmount, clearCart } = useCart();
  const { user } = useAuthStore();
  const total = cart.items.reduce((sum, item) => sum + item.price * item.amount, 0);

  const { mutate: placeOrder, isPending } = useMutation({
    ...createOrderMutation(),
    onSuccess: () => {
      clearCart();
      toast.success('Order placed successfully');
      navigate({ to: '/' });
    },
  });

  if (cart.items.length === 0) {
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
            <Button onClick={() => navigate({ to: '/' })}>Continue Shopping</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="size-6" />
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <Badge variant="secondary" className="ml-2">
          {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map(item => {
            const isFruit = item.product.category === 'fruit';
            const itemTotal = item.price * item.amount;

            return (
              <Card key={item.product.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={item.product.image || '/appicon.png'}
                        alt={item.product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base mb-1 line-clamp-1">
                            {item.product.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {item.product.description}
                          </p>
                          <Badge
                            variant="secondary"
                            className={`text-xs capitalize ${
                              isFruit
                                ? 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800'
                                : 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                            }`}
                          >
                            {item.product.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removeItem(item.product.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          aria-label="Remove item"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>

                      {/* Price and Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">${itemTotal.toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => updateItemAmount(item.product.id, item.amount - 1)}
                            disabled={item.amount <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.amount}</span>
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => updateItemAmount(item.product.id, item.amount + 1)}
                            disabled={item.amount >= item.product.quantity}
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items</span>
                  <span>{cart.items.reduce((sum, item) => sum + item.amount, 0)} items</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              {user ? (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => placeOrder({ cart, customerId: user.id })}
                >
                  {isPending ? <Spinner /> : 'Place Order'}
                </Button>
              ) : (
                <Button className="w-full" size="lg" onClick={() => navigate({ to: '/login' })}>
                  Login to Place Order
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => navigate({ to: '/' })}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
