import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Cart, Product } from '@/types';

type CartStore = {
  cart: Cart;
  addItem: (item: Product) => void;
  removeItem: (productId: number) => void;
  updateItemAmount: (productId: number, amount: number) => void;
  clearCart: () => void;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: { items: [] },
      addItem: item => {
        const cart = { ...get().cart };
        const existingItem = cart.items.find(({ product }) => product.id === item.id);
        if (existingItem) existingItem.amount++;
        else {
          cart.items.push({
            product: item,
            price: item.price,
            amount: 1,
          });
        }

        set({ cart });
      },

      removeItem: productId => {
        const cart = { ...get().cart };
        cart.items = cart.items.filter(({ product }) => product.id !== productId);
        set({ cart });
      },

      updateItemAmount: (productId, amount) => {
        if (amount <= 0) {
          get().removeItem(productId);
          return;
        }

        const cart = { ...get().cart };
        const item = cart.items.find(({ product }) => product.id === productId);

        if (item && amount > item.product.quantity) {
          item.amount = item.product.quantity;
        } else if (item) {
          item.amount = amount;
        }

        set({ cart });
      },

      clearCart: () => {
        set({ cart: { items: [] } });
      },
    }),
    { name: 'cart' }
  )
);
