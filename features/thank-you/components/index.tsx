import { CartClearer } from '@/features/checkout/components/CartCleanerer';
import Button from '@/shared/components/ui/Button';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

interface ThankYouPageProps {
  orderNumber?: string;
}

export function ThankYouPage({ orderNumber }: ThankYouPageProps) {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CartClearer />
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant='h2'
            sx={{ fontWeight: 900, fontSize: 'clamp(48px, 8vw, 140px)' }}
          >
            THANK YOU
          </Typography>
          <Typography
            variant='body2'
            sx={{
              fontWeight: 300,
              fontSize: 'clamp(24px, 4vw,48px)',
              fontStyle: 'italic',
            }}
          >
            for your order&nbsp;
            <Typography
              component='span'
              sx={{
                fontWeight: 500,
                fontSize: 'clamp(24px, 4vw,48px)',
                color: 'var(--color-primary)',
                fontStyle: 'initial',
              }}
            >
              <Suspense fallback={'Missing order number'}>
                {orderNumber ? `#${orderNumber}` : 'Missing order number'}
              </Suspense>
            </Typography>
          </Typography>

          <Typography
            variant='body1'
            sx={{
              fontSize: 'clamp(16px, 2vw, 24px)',
              fontWeight: 300,
              color: '#5C5C5C',
              verticalAlign: 'middle',
              margin: '78px 0',
              maxWidth: '780px',
            }}
          >
            Your order has been received and is currently being processed. You
            will receive an email confirmation with your order details shortly.
          </Typography>

          <Box sx={{ display: 'flex', gap: { xs: '15px', md: '30px' } }}>
            <Button
              component={Link}
              href='/order-history'
              variant='outline'
              sx={{ flex: 1, maxWidth: 280, height: 62 }}
            >
              View Order
            </Button>
            <Button
              component={Link}
              href='/products'
              sx={{ flex: 1, maxWidth: 280, height: 62 }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            maxWidth: 494,
            maxHeight: 450,
            flex: 1,
            height: 'auto',
            display: { xs: 'none', sm: 'none', md: 'block' },
          }}
        >
          <Image
            src='/thank-you.png'
            alt='Thank you image'
            width={494}
            height={450}
            priority
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
