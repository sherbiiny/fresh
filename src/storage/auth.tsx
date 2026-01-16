import type { User } from '@supabase/supabase-js';
import { create } from 'zustand';

type AuthStorage = {
  user: User | null;
  admin: User | null;
  setUser: (user: User) => void;
  setAdmin: (admin: User) => void;
  clearUser: () => void;
  clearAdmin: () => void;
};

export const useAuthStore = create<AuthStorage>()(set => ({
  user: null,
  admin: null,
  setUser: (user: User) => set({ user }),
  setAdmin: (admin: User) => set({ admin }),
  clearUser: () => set({ user: null }),
  clearAdmin: () => set({ admin: null }),
}));
