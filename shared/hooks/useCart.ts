import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import type { CartAddedItem } from '@/features/cart/components/interface';

export function useCart(): {
  cart: CartAddedItem[];
  addItem: (item: CartAddedItem) => void;
  updateQuantity: (
    productId: string,
    size: string,
    newQuantity: number,
  ) => void;
  deleteItem: (productId: string, size: string) => void;
  clearCart: () => void;
  totalItems: number;
} {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
