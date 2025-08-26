'use client';
import { usePathname, useRouter } from 'next/navigation';
import CheckoutForm from '../CheckoutForm';
import { useEffect } from 'react';

export default function CheckoutContent() {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname === '/checkout/summary') {
      router.replace('/checkout/cart');
    } else if (pathname !== '/checkout') {
      router.replace('/checkout/cart');
    }
  }, [pathname, router]);
  if (pathname !== '/checkout') {
    return null;
  }
  return <CheckoutForm />;
}
