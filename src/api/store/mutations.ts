import { mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { storeSupabaseClient } from '@/lib/supabase';

import type { LoginSchema, RegisterSchema } from '@/schemas/auth';

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
      return data.user;
    },

    onError: handleError,
  });
};
