'use client';

import { Box, Collapse, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { validPromocodes } from '../PromocodesSection/consts';
import type { promocode } from '../PromocodesSection/interface';
import SummaryLine from './SummaryLine';
import DiscountLine from './DiscountLine';
import PromocodeSection from '../PromocodesSection';
import TotalSection from './TotalSection';
import { TransitionGroup } from 'react-transition-group';
import { useCartDetails } from '../CartDetailsContext';
import { useCart } from '@/shared/hooks/useCart';

export default function CartSummary(props: BoxProps) {
  const { cartItems } = useCartDetails();
  const { setTotal } = useCart();
  const [promocodes, setPromocodes] = useState<promocode[]>([]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 20;

  const tax = (subtotal + shipping) * 0.23;

  const discountInCash = promocodes.reduce(
    (acc, curr) => acc + curr.discoutInPercent * (subtotal + shipping + tax),
    0,
  );

  const total = subtotal + shipping + tax - discountInCash;

  useEffect(() => {
    setTotal(total);
  }, [total, setTotal]);

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
        px={2}
        py={1}
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

      <Box display='flex' flexDirection='column' gap='20px' px={2}>
        <SummaryLine label='Subtotal' value={subtotal.toFixed(2)} />
        <SummaryLine label='Shipping' value={shipping.toFixed(2)} />
        <SummaryLine label='Tax' value={tax.toFixed(2)} />
        <TransitionGroup>
          {promocodes.map((promo) => (
            <Collapse key={promo.code}>
              <DiscountLine
                key={promo.code}
                promocode={promo}
                subtotal={subtotal + shipping + tax}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      </Box>
      <TotalSection total={total.toFixed(2)} />
    </Box>
  );
}
