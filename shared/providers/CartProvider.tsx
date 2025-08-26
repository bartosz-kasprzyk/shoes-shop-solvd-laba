import type {
  CartAddedItem,
  CartState,
} from '@/features/cart/components/interface';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import useUser from '../hooks/useUser';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartState, setCartState] = useState<CartState>({
    cartId: null,
    cart: [],
  });
  const { session } = useUser();
  const [total, setTotal] = useState<number | null>(null);

  const userId = session?.user.id.toString() || 'guest';
  const cartKey = `cart_${userId}`;
  const generateId = () =>
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 15);

  const resetCartID = () => {
    setCartState((prev) => ({
      ...prev,
      cartId: generateId(),
    }));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(cartKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCartState({
          cartId: parsed.cart.length > 0 ? parsed.cartId : generateId(),
          cart: parsed.cart || [],
        });
      } else {
        setCartState({
          cartId: generateId(),
          cart: [],
        });
      }
    }
  }, [cartKey]);

  useEffect(() => {
    if (typeof window !== 'undefined' && cartState.cartId) {
      localStorage.setItem(cartKey, JSON.stringify(cartState));
    } else if (!cartState.cartId) {
      localStorage.removeItem(cartKey);
    }
  }, [cartState]);

  const addItem = (item: CartAddedItem) => {
    setCartState((prev) => {
      const existing = prev.cart.find(
        (i) => i.productId === item.productId && i.size === item.size,
      );

      let updatedCart: CartAddedItem[];
      if (existing) {
        updatedCart = prev.cart.map((i) =>
          i.productId === item.productId && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      } else {
        updatedCart = [...prev.cart, item];
      }

      return { ...prev, cart: updatedCart };
    });
  };

  const updateQuantity = (
    productId: string,
    size: string,
    newQuantity: number,
  ) => {
    setCartState((prev) => {
      let updatedCart: CartAddedItem[];
      if (newQuantity <= 0) {
        updatedCart = prev.cart.filter(
          (i) => !(i.productId === productId && i.size === size),
        );
      } else {
        updatedCart = prev.cart.map((i) =>
          i.productId === productId && i.size === size
            ? { ...i, quantity: newQuantity }
            : i,
        );
      }
      return { ...prev, cart: updatedCart };
    });
  };

  const deleteItem = (productId: string, size: string) => {
    setCartState((prev) => ({
      ...prev,
      cart: prev.cart.filter(
        (i) => !(i.productId === productId && i.size === size),
      ),
    }));
  };

  const deleteItemById = (productId: string) => {
    setCartState((prev) => ({
      ...prev,
      cart: prev.cart.filter((i) => !(i.productId === productId)),
    }));
  };

  const clearCart = () => {
    if (typeof window !== 'undefined' && cartState.cartId) {
      localStorage.removeItem(cartKey);
    }
    setCartState({ cart: [], cartId: null });
  };

  const totalItems = cartState.cart.length;

  const value = {
    cart: cartState.cart,
    cartId: cartState.cartId,
    resetCartID,
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
