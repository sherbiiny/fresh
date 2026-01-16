import type { Admin, User } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStorage = {
  user: User | null;
  admin: Admin | null;
  loginUser: (user: User) => void;
  loginAdmin: (admin: Admin) => void;
  logoutAdmin: () => void;
  logoutUser: () => void;
};

export const useAuthStore = create<AuthStorage>()(
  persist(
    set => ({
      user: null,
      admin: null,
      loginUser: (user: User) => set({ user }),
      loginAdmin: (admin: Admin) => set({ admin }),
      logoutAdmin: () => set({ user: null }),
      logoutUser: () => set({ admin: null }),
    }),
    { name: 'auth-storage' }
  )
);
