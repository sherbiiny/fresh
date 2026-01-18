import { mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { storeSupabaseClient } from '@/lib/supabase';

import type { LoginSchema, RegisterSchema } from '@/schemas/auth';
import type { Cart } from '@/types';

const handleError = (error: Error) => {
  toast.error(error.message);
  console.error(error);
};

export const loginMutation = () => {
  return mutationOptions({
    mutationFn: async (loginData: LoginSchema) => {
      const { data, error } = await storeSupabaseClient.auth.signInWithPassword(loginData);
      if (error) throw error;
      return data.user;
    },

    onError: handleError,
  });
};

export const registerMutation = () => {
  return mutationOptions({
    mutationFn: async (registerData: RegisterSchema) => {
      const { data, error } = await storeSupabaseClient.auth.signUp(registerData);
      if (error) throw error;

      const { error: customerError } = await storeSupabaseClient.from('customers').insert({
        id: data.user?.id,
        name: registerData.name,
        email: registerData.email,
      });

      if (customerError) throw customerError;
      return data.user;
    },

    onError: handleError,
  });
};

export const createOrderMutation = () => {
  return mutationOptions({
    mutationFn: async ({ cart, customerId }: { cart: Cart; customerId: string }) => {
      const items = cart.items.map(item => ({
        productId: item.product.id,
        quantity: item.amount,
        price: item.price,
      }));

      const { data, error } = await storeSupabaseClient.rpc('create_order_with_items', {
        p_customer_id: customerId,
        p_items: items,
      });

      if (error) throw error;
      return data;
    },
    onError: handleError,
  });
};
