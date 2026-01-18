import { queryOptions } from '@tanstack/react-query';

import { adminSupabaseClient } from '@/lib/supabase';

import type { CustomerFilterSchema } from '@/schemas/customers';
import type { OrderFilterSchema } from '@/schemas/orders';
import type { ProductFilterSchema } from '@/schemas/products';
import type { Customer, Order, Product, DashboardStats } from '@/types';

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

export const getOrdersQuery = (filterQuery: OrderFilterSchema) => {
  return queryOptions<Order[]>({
    queryKey: ['orders', filterQuery],
    queryFn: async () => {
      const { search = '', status = 'all' } = filterQuery;

      let query = adminSupabaseClient
        .from('orders_with_totals')
        .select('*')
        .order('createdAt', { ascending: false });

      if (status !== 'all') query = query.eq('status', status);

      if (search)
        query = query.or(`customer->>name.ilike.%${search}%,customer->>email.ilike.%${search}%`);

      const { data, error } = await query;

      if (error) {
        console.error('Supabase Query Error:', error.message);
        throw error;
      }

      return data ?? [];
    },
  });
};

export const getDashboardStatsQuery = () => {
  return queryOptions<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data, error } = await adminSupabaseClient.rpc('get_dashboard_stats');
      if (error) throw error;
      return data as DashboardStats;
    },
  });
};
