import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== 'customVariant' && prop !== 'customSize',
})<{
  customVariant?: string;
  customSize?: string;
}>(({ customVariant, customSize }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: '8px',
  transition: 'all 0.2s ease-in-out',

  // Size styles
  ...(customSize === 'small' && {
    padding: '6px 16px',
    fontSize: '0.875rem',
  }),
  ...(customSize === 'medium' && {
    padding: '8px 20px',
    fontSize: '1rem',
  }),
  ...(customSize === 'large' && {
    padding: '12px 24px',
    fontSize: '1.125rem',
  }),

  // Variant styles
  ...(customVariant === 'primary' && {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'color-mix(in srgb, var(--color-primary) 80%, black)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(254, 100, 94, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  }),

  ...(customVariant === 'secondary' && {
    backgroundColor: 'var(--color-secondary)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'color-mix(in srgb, var(--color-secondary) 80%, black)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(110, 49, 74, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  }),

  ...(customVariant === 'tertiary' && {
    backgroundColor: 'var(--color-tertiary-light)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'var(--color-tertiary-dark)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(20, 30, 122, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  }),

  ...(customVariant === 'outline' && {
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    border: '2px solid var(--color-primary)',
    '&:hover': {
      backgroundColor: 'var(--color-primary)',
      color: 'white',
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  }),

  ...(customVariant === 'text' && {
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    '&:hover': {
      backgroundColor:
        'color-mix(in srgb, var(--color-primary) 10%, transparent)',
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  }),
}));
