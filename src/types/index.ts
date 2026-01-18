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

export type OrderItem = {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt: string;
  product: {
    id: number;
    title: string;
    image: string | null;
    category: 'fruit' | 'vegetable';
  };
};

export type Order = {
  id: number;
  customerId: string;
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  createdAt: string;
  orderItems: OrderItem[];
  customer: Customer;
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

export type CartItem = {
  product: Product;
  amount: number;
  price: number;
};

export type Cart = {
  items: CartItem[];
};
