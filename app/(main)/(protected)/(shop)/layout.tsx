import { CartDetailsProvider } from '@/features/cart/components/CartDetailsContext';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CartDetailsProvider>{children}</CartDetailsProvider>;
}
