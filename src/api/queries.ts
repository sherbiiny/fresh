import { queryOptions } from '@tanstack/react-query';

import { adminSupabaseClient } from '@/lib/supabase';

import type { CustomerFilterSchema } from '@/schemas/customers';
import type { ProductFilterSchema } from '@/schemas/products';
import type { Customer, Product } from '@/types';

// TODO: Add pagination
export const getCustomersQuery = (filterQuery: CustomerFilterSchema) => {
  return queryOptions<Customer[]>({
    queryKey: ['customers', filterQuery],
    queryFn: async () => {
      const { search = '' } = filterQuery;
      let query = adminSupabaseClient.from('customers').select('*').order('createdAt');
      if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
};

export const getProductsQuery = (filterQuery: ProductFilterSchema) => {
  return queryOptions<Product[]>({
    queryKey: ['products', filterQuery],
    queryFn: async () => {
      const { search = '', category = 'all' } = filterQuery;
      let query = adminSupabaseClient.from('products').select('*').order('createdAt');
      if (search) query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      if (category !== 'all') query = query.eq('category', category);
      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });
};
