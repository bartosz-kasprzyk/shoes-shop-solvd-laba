import { Box } from '@mui/material';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import CheckoutContent from '@/features/checkout/components/CheckoutContent';

export default function CheckoutPage() {
  return (
    <ScrollableContainer>
      <Box sx={{ maxWidth: '1360px', margin: '0 auto' }}>
        <CheckoutContent />
      </Box>
    </ScrollableContainer>
  );
}
