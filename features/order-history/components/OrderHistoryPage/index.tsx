import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { Box, Typography } from '@mui/material';
import OrderHistoryList from '../OrderHistoryList';

export default function OrderHistoryPage() {
  return (
    <ScrollableContainer>
      <Box
        sx={{
          px: { xs: 2, lg: '60px' },
          py: {
            xs: '20px',
            md: '40px',
          },
        }}
      >
        <Typography
          variant='h1'
          sx={{
            fontSize: { xs: '30px', md: '38px', lg: '45px' },
            transition:
              'font-size 0.3s ease-in-out, line-height 0.3s ease-in-out',
            fontWeight: 500,
            mb: { xs: '12px', md: '24px' },
          }}
        >
          Order history
        </Typography>

        <OrderHistoryList />
      </Box>
    </ScrollableContainer>
  );
}
