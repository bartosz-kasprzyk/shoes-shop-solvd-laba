'use client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import convertToSubcurrency from '@/features/shop/lib/convertToSubcurrency';
import { CartDetailsProvider } from '@/features/cart/components/CartDetailsContext';
import { color } from 'framer-motion';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const amount = 10;
  return (
    <CartDetailsProvider>
      <Elements
        stripe={stripePromise}
        options={{
          mode: 'payment',
          currency: 'usd',
          amount: convertToSubcurrency(amount), //cents
          locale: 'en',
          appearance: {
            // theme: 'flat',
            variables: {
              fontFamily: 'Inter, sans-serif',
              colorText: '#666666',
              colorBackground: '#ffffff',
              colorPrimary: '#FE645E',
              spacingUnit: '4px',
            },
            rules: {
              '.Tab': {
                borderRadius: '8px',
                border: '2px solid #E1E1E1',
                padding: '12px 16px',
                marginRight: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
              '.Tab--selected': {
                border: '2px solid #FE645E',
                backgroundColor: '#ffffffff',
                boxShadow: 'none',
              },
              '.Tab--selected:focus': {
                border: '2px solid #FE645E',
                backgroundColor: '#ffffffff',
                boxShadow: 'none',
              },
              '.Input': {
                borderRadius: '8px',
                border: '1px solid #000000',
                padding: '12px',
                marginBottom: '12px',
                fontSize: '14px',
              },
              '.Input:focus': {
                border: '1px solid #FE645E',
                boxShadow: 'none',
              },
              '.Error': {
                color: '#FE645E',
                fontSize: '12px',
                marginTop: '4px',
              },
            },
          },
        }}
      >
        {children}
      </Elements>
    </CartDetailsProvider>
  );
}
