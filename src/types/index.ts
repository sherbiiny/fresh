export type Customer = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  createdAt: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: 'fruit' | 'vegetable';
  price: number;
  quantity: number;
  image: string | null;
  createdAt: string;
};

export type Order = {
  id: number;
  customerId: string;
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  createdAt: string;
  customer?: {
    name: string;
    email: string;
  };
};

export type BestCustomer = Omit<Customer, 'createdAt'> & {
  totalOrders: number;
  totalSpent: number;
};

export type DashboardStats = {
  customersCount: number;
  productsCount: number;
  ordersCount: number;
  bestCustomers: BestCustomer[];
  recentPendingOrders: Order[];
};
