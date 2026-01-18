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
  price: number;
  quantity: number;
  image: string | null;
  createdAt: string;
};
