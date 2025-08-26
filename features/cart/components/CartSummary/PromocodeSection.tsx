'use client';

import { Box, Collapse, Typography } from '@mui/material';
import { useState } from 'react';

import { TransitionGroup } from 'react-transition-group';

import type { promocode } from './interface';
import { Button, Input } from '@/shared/components/ui';
import { DropdownArrowIcon } from '@/shared/icons';
import PromocodeItem from './PromocodeItem';

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

    if (promocodes.length > 0) {
      setIsInputError(true);
      setInputErrorText('You can only apply one promocode at a time');
    } else if (exists) {
      setPromocodes([exists]);
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
        sx={{ cursor: 'pointer', userSelect: 'none' }}
        display='flex'
        alignItems={'center'}
        gap={1}
      >
        <Typography noWrap px={2} fontSize={{ xs: '0.8em', sm: '0.67em' }}>
          Do you have a promocode?
        </Typography>
        <DropdownArrowIcon rotated={arePromocodesOpened} />
      </Box>

      <Collapse in={arePromocodesOpened}>
        <Box display='flex' gap={1} px={1}>
          <Input
            sx={{
              position: 'relative',
              '& .MuiInputBase-root': {
                p: 0,
                m: 0,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: '0px',
                p: 0,
                m: 0,
              },
              '& .MuiInput-inputAdornedEnd': {
                p: 0,
                m: 0,
              },
              '& .MuiOutlinedInput-input': {
                pr: 2,
                borderRadius: '8px',
                border: '1px solid lightgray',
                fontSize: '0.9em',
                mr: 0,
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <Button
                    onClick={handleAddPromocode}
                    sx={{
                      // position: 'absolute',
                      zIndex: 10,
                      width: '10ch',
                      right: 0,
                      ml: 1,
                      mr: 0,
                      height: '100%',
                    }}
                  >
                    Apply
                  </Button>
                ),
              },
            }}
            title=''
            id='promocode'
            placeholder=''
            error={isInputError}
            value={inputPromocode}
            helperText={inputErrorText}
            onChange={(e) => setInputPromocode(e.target.value)}
          />
        </Box>
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
