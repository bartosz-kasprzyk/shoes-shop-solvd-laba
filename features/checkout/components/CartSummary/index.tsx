'use client';

import { Box, Collapse, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { useState } from 'react';
import Button from '@/shared/components/ui/Button';
import { mockPromocodes as validPromocodes } from '@/shared/mocks/mockPromocodes';
import type { promocode } from './interface';
import SummaryLine from '../SummaryLine';
import DiscountLine from '../DiscountLine';
import PromocodeSection from '../PromocodeSection';
import TotalSection from '../TotalSection';
import { TransitionGroup } from 'react-transition-group';

export default function CartSummary(props: BoxProps) {
  const [promocodes, setPromocodes] = useState<promocode[]>([]);
  const subtotal = 410;
  const shipping = 20;
  const tax = 0;
  const stageText = 'checkout';
  const discountInCash = promocodes.reduce(
    (acc, curr) => acc + curr.discoutInCash,
    0,
  );
  const total = subtotal + shipping + tax - discountInCash;

  const handleChangeStageButton = () => {
    console.log('button was clicked');
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
        marginBottom='30px'
        fontSize='1.5em'
        paddingY={1}
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
        <SummaryLine label='Subtotal' value={subtotal} />
        <SummaryLine label='Shipping' value={shipping} />
        <SummaryLine label='Tax' value={tax} />
        <TransitionGroup>
          {promocodes.map((promo) => (
            <Collapse key={promo.code}>
              <DiscountLine key={promo.code} promocode={promo} />
            </Collapse>
          ))}
        </TransitionGroup>
      </Box>

      <TotalSection total={total} />

      <Button
        onClick={handleChangeStageButton}
        sx={{ width: '100%', marginTop: '80px' }}
      >
        {stageText}
      </Button>
    </Box>
  );
}
