import { mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminSupabaseClient } from '@/lib/supabase';

import { queryClient } from '../queryClient';

import type { LoginSchema } from '@/schemas/auth';
import type { AddProductSchema } from '@/schemas/products';

const handleError = (error: Error) => {
  toast.error(error.message);
  console.error(error);
};

export const loginAdminMutation = () => {
  return mutationOptions({
    mutationFn: async (loginData: LoginSchema) => {
      const { data, error } = await adminSupabaseClient.auth.signInWithPassword(loginData);
      if (error) throw error;

      if (data.user?.app_metadata?.role !== 'admin') {
        await adminSupabaseClient.auth.signOut();
        throw new Error('Invalid credentials');
      }

      return data.user;
    },

    onError: handleError,
  });
};

export const addProductMutation = () => {
  return mutationOptions({
    mutationFn: async (product: AddProductSchema) => {
      const { data, error } = await adminSupabaseClient.from('products').insert(product);
      if (error) throw error;
      return data;
    },

    onError: handleError,
  });
};

export const updateProductMutation = () => {
  return mutationOptions({
    mutationFn: async ({ id, ...product }: AddProductSchema & { id: number }) => {
      const { data, error } = await adminSupabaseClient
        .from('products')
        .update(product)
        .eq('id', id);
      if (error) throw error;
      return data;
    },

    onError: handleError,
    onSuccess: () => {
      toast.success('Product updated successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const deleteProductMutation = () => {
  return mutationOptions({
    mutationFn: async (productId: number) => {
      const { data, error } = await adminSupabaseClient
        .from('products')
        .delete()
        .eq('id', productId);
      if (error) throw error;
      return data;
    },

    onError: handleError,

    onSuccess: () => {
      toast.success('Product deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
