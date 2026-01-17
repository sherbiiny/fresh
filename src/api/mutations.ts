import { mutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";

import { adminSupabaseClient } from "@/lib/supabase";

import type { LoginSchema } from "@/schemas/auth";
import type { AddProductSchema } from "@/schemas/products";

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
    
    onError: (error: Error) => {
      toast.error(error.message);
      console.error(error);
    }
  });
}

export const addProductMutation = () => {
  return mutationOptions({
    mutationFn: async (product: AddProductSchema) => {
      const { data, error } = await adminSupabaseClient.from('products').insert(product);
      if (error) throw error;
      return data;
    },
    
    onError: (error: Error) => {
      toast.error(error.message);
      console.error(error);
    }
  });
}