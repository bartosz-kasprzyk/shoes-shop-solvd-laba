import { Box, Typography } from '@mui/material';
import { EmptyState } from '@/shared/components/ui';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';

export default function CartPageEmpty() {
  return (
    <ScrollableContainer>
      <Box
        px={{ xs: 0, sm: 4, xl: 20 }}
        py={{ xs: 0, md: 2 }}
        maxWidth={'1500px'}
        mx='auto'
        sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}
      >
        <Box
          sx={{
            flex: 1,
            paddingX: {
              xs: '40px 16px',
              sm: '60px 32px',
              md: '80px 64px',
              lg: '80px 196px',
            },
          }}
        >
          <Typography
            variant='h4'
            marginBottom='20px'
            fontSize={{ xs: '24px', md: '32px' }}
            fontWeight={500}
            px={2}
            py={1}
            borderTop={{
              xs: '1px color-mix(in srgb, black 10%, transparent) solid',
              sm: 'none',
            }}
            borderBottom={{
              xs: '1px color-mix(in srgb, black 10%, transparent) solid',
              sm: 'none',
            }}
          >
            Cart
          </Typography>
          <EmptyState
            title="You haven't added any products to the cart yet"
            description='Click below to see available products'
            buttonText='Shop Now'
            buttonHref='/products'
          />
        </Box>
      </Box>
    </ScrollableContainer>
  );
}
