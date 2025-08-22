'use client';

import type { CartAddedItem } from '@/features/cart/components/interface';
import { createContext } from 'react';

interface CartContextType {
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
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
