import type { CartAddedItem } from '@/features/cart/components/interface';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import useUser from '../hooks/useUser';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartAddedItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const { session } = useUser();
  const [total, setTotal] = useState<number | null>(null);

  const userId = session?.user.id.toString() || 'guest';
  const cartKey = `cart_${userId}`;

  const generateId = () =>
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 15);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(cartKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCart(parsed.cart || []);
        setCartId(parsed.cart.length > 0 ? parsed.cartId : generateId());
      } else {
        setCart([]);
        setCartId(generateId());
      }
    }
  }, [cartKey]);

  useEffect(() => {
    if (typeof window !== 'undefined' && cartId) {
      localStorage.setItem(cartKey, JSON.stringify({ cart, cartId }));
    }
  }, [cart, cartId, cartKey]);

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

  const deleteItemById = (productId: string) => {
    setCart((prev) => prev.filter((i) => !(i.productId === productId)));
  };

  const clearCart = () => {
    if (typeof window !== 'undefined' && cartId) {
      localStorage.setItem(cartKey, JSON.stringify({ cart: [], cartId: null }));
    }
    setCart([]);
    setCartId(null);
  };

  const totalItems = cart.length;

  const value = {
    cart,
    cartId,
    total,
    setTotal,
    addItem,
    updateQuantity,
    deleteItem,
    deleteItemById,
    clearCart,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
