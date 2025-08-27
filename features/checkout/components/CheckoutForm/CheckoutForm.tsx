'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Collapse, Typography } from '@mui/material';
import ShippingInfoSection from '../ShippingInfoSection';
import type { PersonalInfo } from '../PersonalInfoSection/interface';
import type { ShippingInfo } from '../ShippingInfoSection/interface';
import PersonalInfoSection from '../PersonalInfoSection';
import type { CheckoutFormProps } from './interface';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import convertToSubcurrency from '@/features/shop/lib/convertToSubcurrency';
import useUser from '@/shared/hooks/useUser';

import { z } from 'zod';
import { useCheckoutStore } from '../../stores/checkoutStore';
import { useCart } from '@/shared/hooks/useCart';
import { usePathname, useRouter } from 'next/navigation';

export const personalInfoSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  surname: z.string().min(2, 'Surname is required'),
  email: z.email('Invalid email address'),
  phoneNumber: z.string().min(7, 'Phone number is too short'),
});

export const shippingInfoSchema = z.object({
  country: z.string().min(2, 'Country is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(3, 'Zip code is required'),
  address: z.string().min(5, 'Address is required'),
});

export const checkoutSchema = z.object({
  personalInfo: personalInfoSchema,
  shippingInfo: shippingInfoSchema,
});

function generateOrderNumber(): string {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cartId, cart, total, resetCartID } = useCart();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState('');
  const [pIId, setPIId] = useState('');
  const [loading, setLoading] = useState(false);
  const { session } = useUser();
  const id = session?.user.id as number;
  const isFetching = useRef(false);
  const pathname = usePathname();
  const router = useRouter();

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
  });
  const [personalErrors, setPersonalErrors] = useState<Record<string, string>>(
    {},
  );

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    country: 'US',
    city: '',
    state: '',
    zipCode: '',
    address: '',
  });
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>(
    {},
  );
  const { setSubmit, setLoading: setButtonLoading } = useCheckoutStore();

  useEffect(() => {
    if (id && total && !loading) {
      isFetching.current = true;
      setLoading(true);
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: convertToSubcurrency(total),
          personalInfo,
          shippingInfo,
          cartId,
          strapiUserId: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          setPIId(data.paymentIntentId);
        })
        .finally(() => {
          setLoading(false);
          setButtonLoading(false);
          isFetching.current = false;
        });
    }
  }, [total, id, cartId]);

  const handlePersonalInfoChange = (
    field: keyof PersonalInfo,
    value: string,
  ) => {
    setPersonalInfo((prev: PersonalInfo) => ({ ...prev, [field]: value }));
  };

  const handleShippingInfoChange = (
    field: keyof ShippingInfo,
    value: string,
  ) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    const result = checkoutSchema.safeParse({
      personalInfo,
      shippingInfo,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      console.log(result);
      result.error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        fieldErrors[path] = issue.message;
      });

      setPersonalErrors(
        Object.fromEntries(
          Object.entries(fieldErrors)
            .filter(([key]) => key.startsWith('personalInfo'))
            .map(([key, value]) => [key.replace('personalInfo.', ''), value]),
        ),
      );

      setShippingErrors(
        Object.fromEntries(
          Object.entries(fieldErrors)
            .filter(([key]) => key.startsWith('shippingInfo'))
            .map(([key, value]) => [key.replace('shippingInfo.', ''), value]),
        ),
      );
      setButtonLoading(false);
      setLoading(false);
      return;
    }
    setPersonalErrors({});
    setShippingErrors({});

    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setButtonLoading(false);
      setLoading(false);
      return;
    }
    const orderId = generateOrderNumber();
    const res = await fetch('/api/update-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        strapiUserId: id,
        orderId,
        cart: JSON.stringify(cart),
        personalInfo,
        shippingInfo,
        paymentIntentId: pIId,
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      setErrorMessage(data.error);
      setButtonLoading(false);
      setLoading(false);
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: personalInfo.name,
            email: personalInfo.email,
            address: {
              country: shippingInfo.country,
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.zipCode,
            },
          },
        },
        return_url: `http://localhost:3000/thank-you?orderId=${orderId}&cartId=${cartId}`, // to be changed, make dynamic instead of localhost, pass data
      },
    });
    if (error) {
      resetCartID();
      setErrorMessage(error.message);
      setButtonLoading(false);
      setLoading(false);
      return;
    }
  }, [personalInfo, shippingInfo, clientSecret, stripe, elements]);

  useEffect(() => {
    setSubmit(handleSubmit);
  }, [handleSubmit]);
  if (!stripe || !elements) {
    return <CircularProgress />;
  }

  if (pathname === '/checkout/summary') {
    router.replace('/checkout/cart');
    return null;
  }

  if (pathname !== '/checkout') {
    router.replace('/checkout');
  }

  return (
    <Box height={'100%'}>
      <Box
        sx={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Box>
          <Typography
            variant='h4'
            marginBottom='5px'
            fontSize={{ xs: '24px', md: '32px' }}
            fontWeight={500}
            py={1}
            px={{ xs: 2, sm: 0 }}
            borderBottom={{
              xs: '1px color-mix(in srgb, black 10%, transparent) solid',
              sm: 'none',
            }}
          >
            Checkout
          </Typography>
          <PersonalInfoSection
            personalInfo={personalInfo}
            personalErrors={personalErrors}
            onChange={handlePersonalInfoChange}
          />

          <ShippingInfoSection
            shippingInfo={shippingInfo}
            shippingErrors={shippingErrors}
            onChange={handleShippingInfoChange}
          />

          {clientSecret && (
            <Box px={{ xs: 2, sm: 0 }} py={1}>
              <Typography variant='h6' sx={{ my: 3, fontWeight: 500 }}>
                Payment info
              </Typography>
              <PaymentElement
                options={{
                  layout: {
                    type: 'tabs',
                    defaultCollapsed: false,
                  },
                  fields: {
                    billingDetails: {
                      address: 'never',
                    },
                  },
                }}
              />
            </Box>
          )}
          <Typography
            mt={2}
            sx={{ lineHeight: '1em' }}
            color='error'
            height={'line'}
            role={errorMessage ? 'alert' : undefined}
          >
            {errorMessage && errorMessage + ' Try again.'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
