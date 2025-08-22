'use client';

import { useCartDetails } from '@/features/cart/components/CartDetailsContext';
import CartPage from '@/features/cart/components/CartPage';
import CartPageEmpty from '@/features/cart/components/CartPageEmpty';
import { useEffect, useState } from 'react';

export default function CartPageWrapper() {
  const { cartItems } = useCartDetails();
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
