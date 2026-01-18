import { queryOptions } from '@tanstack/react-query';

import { storeSupabaseClient } from '@/lib/supabase';

import type { ProductFilterSchema } from '@/schemas/products';
import type { Product } from '@/types';

export const getProductsQuery = (filterQuery: ProductFilterSchema) => {
  return queryOptions<Product[]>({
    queryKey: ['products', filterQuery],
    queryFn: async () => {
      const { search = '', category = 'all', sort = 'default' } = filterQuery;
      let query = storeSupabaseClient.from('products').select('*');
      if (search) query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      if (category !== 'all') query = query.eq('category', category);
      if (sort === 'price-low') query = query.order('price', { ascending: true });
      else if (sort === 'price-high') query = query.order('price', { ascending: false });
      else query = query.order('createdAt');
      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });
};
