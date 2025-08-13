import { CartLogoIcon } from '@/shared/icons';
import { Button } from '@mui/material';

export default function TopBarCart() {
  return (
    <Button
      sx={{
        cursor: 'pointer',
        borderRadius: '50%',
        p: 1,
        minWidth: 'auto',
        transition: 'background-color 0.2s',
        '&:hover': {
          backgroundColor: '#f3f4f6',
        },
      }}
    >
      <CartLogoIcon />
    </Button>
  );
}
