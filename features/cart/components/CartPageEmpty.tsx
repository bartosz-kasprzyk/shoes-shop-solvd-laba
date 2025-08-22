import { Box, Typography } from '@mui/material';
import { EmptyState } from '@/shared/components/ui';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';

export default function CartPageEmpty() {
  return (
    <ScrollableContainer>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Box
          sx={{
            flex: 1,
            padding: {
              xs: '40px 16px',
              sm: '60px 32px',
              md: '80px 64px',
              lg: '80px 196px',
            },
          }}
        >
          <Typography
            variant='h4'
            component='h2'
            sx={{
              fontWeight: 600,
              marginBottom: { xs: 4, sm: 5, md: 6 },
              color: '#1f2937',
              fontSize: { xs: 28, sm: 35, lg: 42 },
            }}
          >
            Cart
          </Typography>
          <EmptyState
            title="You don't have any products yet"
            description='Post can contain video, images and text'
            buttonText='Add product'
            buttonHref='/products'
          />
        </Box>
      </Box>
    </ScrollableContainer>
  );
}
