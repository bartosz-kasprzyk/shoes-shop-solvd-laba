import { Box, Typography } from '@mui/material';

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
      }}
    >
      {icon}
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 700,
          '@media (max-width:1150px)': {
            display: 'none',
          },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
