import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'customVariant',
})<{
  customVariant?: string;
}>(({ customVariant }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: '8px',
  transition: 'all 0.2s ease-in-out',

  ...(customVariant === 'primary' && {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'color-mix(in srgb, var(--color-primary) 80%, black)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(254, 100, 94, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  }),

  ...(customVariant === 'outline' && {
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    border: '1px solid var(--color-primary)',
    '&:hover': {
      backgroundColor: 'var(--color-primary)',
      color: 'white',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  }),

  ...(customVariant === 'outline-black' && {
    backgroundColor: 'transparent',
    color: '#5c5c5c',
    border: '1px solid #494949',
    '&:hover': {
      backgroundColor: '#494949',
      color: 'white',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  }),
}));
