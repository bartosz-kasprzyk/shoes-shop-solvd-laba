import { Box, Typography } from '@mui/material';
import { blob } from 'stream/consumers';

interface OrderStatusProps {
  title: string;
  icon: React.ReactNode;
  color: string;
}

export default function OrderStatus({ title, icon, color }: OrderStatusProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        color: `${color}`,
        // border: '1px solid red',
      }}
    >
      {icon}
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 700,
          display: {
            xs: 'none',
            sm: 'block',
          },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
