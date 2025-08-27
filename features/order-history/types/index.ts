export interface Order {
  orderId: string;
  amount: number;
  productsQuantity: number;
  date: string;
  delivery: string;
  contacts: string;
  payment: string;
  products: OrderProduct[];
}

export interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  gender: string;
  size: string;
}

export interface Transaction {
  amount?: number;
  created?: number;
  metadata: {
    orderId?: string;
    email?: string;
    cart?: string;
  };
  shipping?: {
    name?: string;
    phone?: string;
    address?: Record<string, string | undefined>;
  };
}
