'use client';

import { Box, Typography } from '@mui/material';
import { Button } from '@/shared/components/ui';
import type { PromocodeItemProps } from './PromocodeItem.interface';

export default function PromocodeItem({
  promocode,
  onRemove,
}: PromocodeItemProps) {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      gap={1}
      my={1 / 2}
      alignItems='center'
    >
      <Box>
        <Typography fontWeight={500}>{promocode.code}</Typography>
        <Typography fontSize='0.7em' color='gray'>
          {promocode.text}
        </Typography>
      </Box>
      <Button
        variant='outline'
        sx={{ width: '20%' }}
        onClick={() => onRemove(promocode.code)}
      >
        remove
      </Button>
    </Box>
  );
}
