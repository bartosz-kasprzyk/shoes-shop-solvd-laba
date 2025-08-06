import { IconButton, styled } from '@mui/material';

export const RoundButton = styled(IconButton)(() => ({
  borderRadius: '100%',
  width: '24px',
  height: '24px',
  backgroundColor: 'white',

  '&:hover': {
    backgroundColor: '#F0F0F0',
  },

  '&.Mui-disabled': {
    backgroundColor: 'white',
    opacity: 0.5,
    cursor: 'default',
  },
}));
