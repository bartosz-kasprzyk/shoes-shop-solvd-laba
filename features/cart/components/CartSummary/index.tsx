'use client';

import { Box, Collapse, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from '@/shared/components/ui/Button';
import { mockPromocodes as validPromocodes } from '@/shared/mocks/mockPromocodes';
import type { promocode } from './interface';
import SummaryLine from './SummaryLine';
import DiscountLine from './DiscountLine';
import PromocodeSection from './PromocodeSection';
import TotalSection from './TotalSection';
import { TransitionGroup } from 'react-transition-group';
import { useCartDetails } from '../CartDetailsContext';

import { usePathname, useRouter } from 'next/navigation';
import { useCheckoutStore } from '@/features/checkout/stores/checkoutStore';
import { useCart } from '@/shared/hooks/useCart';

export default function CartSummary(props: BoxProps) {
  const { cartItems, refetchAllProducts } = useCartDetails();
  const { setTotal } = useCart();
  const [promocodes, setPromocodes] = useState<promocode[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const buttonText = pathname === '/checkout' ? 'Pay' : 'Go to checkout';
  const { submit } = useCheckoutStore();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 20;

  const tax = (subtotal + shipping) * 0.23;

  const discountInCash = promocodes.reduce(
    (acc, curr) => acc + curr.discoutInCash,
    0,
  );

  const total = subtotal + shipping + tax - discountInCash;

  useEffect(() => {
    setTotal(total);
  }, [total, setTotal]);

  const handleChangeStageButton = () => {
    if (pathname !== '/checkout') {
      refetchAllProducts();
      if (cartItems.length > 0) router.push('/checkout');
    } else {
      submit?.();
    }
  };

  const handleDeletePromocode = (code: string) => {
    setPromocodes((prev) => prev.filter((p) => p.code !== code));
  };

  return (
    <Box
      {...props}
      display='flex'
      justifyContent='space-between'
      flexDirection='column'
      fontSize={{ xs: 20, sm: 20, lg: 30 }}
    >
      <Typography
        variant='h4'
        marginBottom='30px'
        fontSize={{ xs: '24px', md: '32px' }}
        fontWeight={500}
        borderTop={{
          xs: '1px color-mix(in srgb, black 10%, transparent) solid',
          sm: 'none',
        }}
        borderBottom={{
          xs: '1px color-mix(in srgb, black 10%, transparent) solid',
          sm: 'none',
        }}
      >
        Summary
      </Typography>

      <PromocodeSection
        promocodes={promocodes}
        setPromocodes={setPromocodes}
        validPromocodes={validPromocodes}
        handleDeletePromocode={handleDeletePromocode}
      />

      <Box display='flex' flexDirection='column' gap='20px'>
        <SummaryLine label='Subtotal' value={subtotal.toFixed(2)} />
        <SummaryLine label='Shipping' value={shipping.toFixed(2)} />
        <SummaryLine label='Tax' value={tax.toFixed(2)} />
        <TransitionGroup>
          {promocodes.map((promo) => (
            <Collapse key={promo.code}>
              <DiscountLine key={promo.code} promocode={promo} />
            </Collapse>
          ))}
        </TransitionGroup>
      </Box>

      <TotalSection total={total.toFixed(2)} />

      <Button
        onClick={handleChangeStageButton}
        sx={{ width: '100%', marginTop: '80px' }}
      >
        {buttonText}
      </Button>
    </Box>
  );
}
