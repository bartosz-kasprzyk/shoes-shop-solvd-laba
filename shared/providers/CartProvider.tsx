import type { CartAddedItem } from '@/features/cart/components/interface';
import type { ReactNode } from 'react';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartAddedItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

  const addItem = (item: CartAddedItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.size === item.size,
      );

      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      }

      return [...prev, item];
    });
  };

  const updateQuantity = (
    productId: string,
    size: string,
    newQuantity: number,
  ) => {
    setCart((prev) => {
      if (newQuantity <= 0) {
        return prev.filter(
          (i) => !(i.productId === productId && i.size === size),
        );
      }
      return prev.map((i) =>
        i.productId === productId && i.size === size
          ? { ...i, quantity: newQuantity }
          : i,
      );
    });
  };

  const deleteItem = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size)),
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.length;

  const value = {
    cart,
    addItem,
    updateQuantity,
    deleteItem,
    clearCart,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
