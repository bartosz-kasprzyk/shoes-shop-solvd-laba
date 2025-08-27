'use client';

import { useEffect, useState } from 'react';
import CartPage from './CartPage';
import CartPageEmpty from './CartPageEmpty';
import { useCartDetails } from './CartDetailsContext';

export default function CartContent() {
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
