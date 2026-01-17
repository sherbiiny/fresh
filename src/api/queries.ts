import { queryOptions } from "@tanstack/react-query";

import { adminSupabaseClient } from "@/lib/supabase";

import type { Customer } from "@/types";

// TODO: Add pagination
export const getCustomersQuery = () => {
  return queryOptions<Customer[]>({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await adminSupabaseClient.from('customers').select('*');
      if (error) throw error;
      return data;
    },
  });
}