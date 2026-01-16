export type UserRole = 'admin' | 'user';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Admin = User & {
  permissions: string[];
};
