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
      backgroundColor: 'color-mix(in srgb, var(--color-primary) 90%, black)',
      transform: 'translateY(-2px)',
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
      backgroundColor:
        'color-mix(in srgb, var(--color-primary) 20%, transparent)',
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
      backgroundColor: 'color-mix(in srgb, #494949 20%, transparent)',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  }),
}));
