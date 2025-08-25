'use client';
import { useEffect } from 'react';
import { useCart } from '@/shared/hooks/useCart';
import { useSearchParams } from 'next/navigation';

export function CartClearer() {
  const searchParams = useSearchParams();
  const urlCartId = searchParams.get('cartId');
  const { cartId, clearCart } = useCart();

  useEffect(() => {
    if (urlCartId && cartId == urlCartId) {
      clearCart();
    }
  }, [urlCartId, cartId, clearCart]);

  return null;
}
