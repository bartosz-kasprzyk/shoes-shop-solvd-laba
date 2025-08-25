'use client';

import { useEffect, useState } from 'react';
import { useCartContext } from './CartContext';
import CartPage from './CartPage';
import CartPageEmpty from './CartPageEmpty';

export default function CartContent() {
  const { cartItems } = useCartContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }

  if (cartItems.length === 0) {
    return <CartPageEmpty />;
  }

  return <CartPage />;
}
