import { queryOptions } from '@tanstack/react-query';

import { storeSupabaseClient } from '@/lib/supabase';

import type { ProductFilterSchema } from '@/schemas/products';
import type { Product } from '@/types';

export const getProductsQuery = (filterQuery: ProductFilterSchema) => {
  return queryOptions<Product[]>({
    queryKey: ['products', filterQuery],
    queryFn: async () => {
      const { search = '', category = 'all' } = filterQuery;
      let query = storeSupabaseClient.from('products').select('*').order('createdAt');
      if (search) query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      if (category !== 'all') query = query.eq('category', category);
      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });
};
