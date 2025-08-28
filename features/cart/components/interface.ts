import type { ProductFromServer } from '@/features/products/types/shared.interface';

export interface CartState {
  cartId: string | null;
  cart: CartAddedItem[];
}

export type CartAddedItem = {
  productId: string;
  size: string;
  quantity: number;
};

export type CartItemWithProduct = CartAddedItem & {
  product: ProductFromServer;
};

export interface CartItemForDisplay {
  id: number;
  img: { src: string };
  name: string;
  price: number;
  gender: 'Men' | 'Women';
  available: boolean;
  size: string;
  quantity: number;
}

export interface CartPageProps {
  cartItems: CartItemForDisplay[];
}

export interface CartDetailsContextType {
  cartItems: CartItemForDisplay[];
  handleQuantityChange: (
    productId: string,
    size: string,
    newQuantity: number,
  ) => void;
  handleDeleteItem: (productId: string, size: string) => void;
  isCartDetailsLoading: boolean;
  refetchAllProducts: () => void;
}
