'use client';

import { Box, Collapse, Typography } from '@mui/material';
import { useState } from 'react';

import { TransitionGroup } from 'react-transition-group';

import PromocodeItem from './PromocodeItem';
import type { promocode } from './CartSummary/interface';
import { Button, Input } from '@/shared/components/ui';
import { DropdownArrowIcon } from '@/shared/icons';

interface Props {
  promocodes: promocode[];
  setPromocodes: React.Dispatch<React.SetStateAction<promocode[]>>;
  validPromocodes: promocode[];
  handleDeletePromocode: (code: string) => void;
}

export default function PromocodeSection({
  promocodes,
  setPromocodes,
  validPromocodes,
  handleDeletePromocode,
}: Props) {
  const [arePromocodesOpened, setArePromocodesOpened] = useState(false);
  const [inputPromocode, setInputPromocode] = useState('');
  const [isInputError, setIsInputError] = useState(false);
  const [inputErrorText, setInputErrorText] = useState('');

  const handleAddPromocode = () => {
    const exists = validPromocodes.find((p) => p.code === inputPromocode);
    const alreadyUsed = promocodes.some((p) => p.code === inputPromocode);

    if (alreadyUsed) {
      setIsInputError(true);
      setInputErrorText('This promocode was applied before');
    } else if (exists) {
      setPromocodes((prev) => [...prev, exists]);
      setInputPromocode('');
      setIsInputError(false);
    } else {
      setIsInputError(true);
      setInputErrorText('Invalid promocode');
    }
  };

  return (
    <Box marginBottom='30px'>
      <Box
        onClick={() => setArePromocodesOpened((prev) => !prev)}
        // component='button'
        sx={{ cursor: 'pointer' }}
        display='flex'
        alignItems={'center'}
        gap={1}
      >
        <Typography fontSize={{ xs: '0.8em', sm: '0.67em' }}>
          Do you have a promocode?
        </Typography>
        <DropdownArrowIcon />
      </Box>

      <Collapse in={arePromocodesOpened}>
        <Box display='flex' gap={1}>
          <Input
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-text-primary)',
                borderRadius: '8px',
              },
              '& .MuiOutlinedInput-input': { fontSize: '0.9em' },
            }}
            title=''
            id='promocode'
            placeholder=''
            error={isInputError}
            value={inputPromocode}
            onChange={(e) => setInputPromocode(e.target.value)}
          />
          <Button
            onClick={handleAddPromocode}
            sx={{ mt: { xs: 0.5, sm: 1 }, width: '0.2' }}
          >
            Apply
          </Button>
        </Box>

        <Collapse sx={{ my: 1 }} in={isInputError}>
          <Typography variant='caption' color='red'>
            {inputErrorText}
          </Typography>
        </Collapse>

        <TransitionGroup>
          {promocodes.map((promo) => (
            <Collapse key={promo.code}>
              <PromocodeItem
                key={promo.code}
                promocode={promo}
                onRemove={handleDeletePromocode}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      </Collapse>
    </Box>
  );
}
