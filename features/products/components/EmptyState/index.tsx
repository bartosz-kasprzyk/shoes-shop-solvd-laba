import { Box, Typography } from '@mui/material';
import CartIcon from '../../../../shared/icons/CartIcon';
import type { ReactNode } from 'react';

export default function EmptyState({
  text,
  subText,
  children,
}: {
  text: string;
  subText: string;
  children?: ReactNode;
}) {
  return (
    <Box
      sx={{
        height: '60%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          backgroundColor: '#f3f4f6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 3,
        }}
      >
        <CartIcon />
      </Box>
      <Typography
        variant='h6'
        sx={{
          fontWeight: 600,
          marginBottom: 1,
          color: '#1f2937',
          fontSize: { xs: 16, lg: 22 },
        }}
      >
        {text}
      </Typography>
      <Typography
        variant='body2'
        sx={{
          color: '#6b7280',
          marginBottom: 4,
          maxWidth: '360px',
          fontSize: { xs: 14, lg: 18 },
        }}
      >
        {subText}
      </Typography>
      {children}
    </Box>
  );
}
