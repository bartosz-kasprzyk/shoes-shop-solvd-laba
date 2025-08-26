'use client';
import CartPageEmpty from '@/features/cart/components/CartPageEmpty';
import CartSummary from '@/features/cart/components/CartSummary';
import { useCheckoutStore } from '@/features/checkout/stores/checkoutStore';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { Button } from '@/shared/components/ui';
import { useCart } from '@/shared/hooks/useCart';
import { Box, Link, useMediaQuery, useTheme } from '@mui/material';
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from 'next/navigation';

export default function ShopLayout({
  order,
  summary,
}: Readonly<{
  order: React.ReactNode;
  summary: React.ReactNode;
}>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { totalItems } = useCart();
  const router = useRouter();
  // const segment = useSelectedLayoutSegment('order')
  const segment = useSelectedLayoutSegment('summary');
  const pathname = usePathname();
  const buttonText = pathname === '/checkout' ? 'Pay' : 'Go to checkout';

  const { submit } = useCheckoutStore();

  const handleNavigate = () => {
    switch (pathname) {
      case '/checkout/cart':
        if (isMobile) router.push('/checkout/summary');
        else router.push('/checkout');
        break;
      case '/checkout':
        submit?.();
        break;
      default:
        router.replace('/checkout');
        break;
    }
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      height={'100%'}
      overflow={'hidden'}
      pt={{ xs: 0, sm: 3 }}
    >
      {totalItems > 0 ? (
        <>
          {!isMobile && (
            <Box
              px={{ xs: 0, sm: 4, xl: 15 }}
              py={!isMobile ? 2 : 0}
              maxWidth={'1500px'}
              width='100%'
              mx='auto'
            >
              <Link
                onClick={() => router.back()}
                sx={{
                  textDecoration: 'underline',
                  textTransform: 'none',
                  color: '#666',
                  fontSize: '14px',
                  fontWeight: 400,
                  cursor: 'pointer',
                }}
              >
                Back
              </Link>
            </Box>
          )}
          <Box
            sx={{
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollbarGutter: 'stable',
              '&::-webkit-scrollbar': {
                width: '1px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#D3D3D3',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
              },
              scrollbarWidth: 'thin',
              scrollbarColor: '#D3D3D3 transparent',
            }}
          >
            <Box
              pb={!isMobile ? 5 : 0}
              maxWidth={'1500px'}
              mx={'auto'}
              px={{ xs: 0, sm: 4, xl: 15 }}
              display={'flex'}
              flexDirection={isMobile ? 'column' : 'row'}
              overflow={'hidden'}
              gap={{ xs: 4, xl: 15 }}
            >
              <Box width={'100%'} flex={10} minWidth={0}>
                {isMobile && segment === 'summary' ? summary : order}
              </Box>
              {!isMobile && (
                <Box flexGrow={1} width={'auto'}>
                  {summary}
                  <Button
                    onClick={handleNavigate}
                    sx={{
                      width: '100%',
                      mt: '100px',
                      position: 'sticky',
                      bottom: 10,
                      mx: 'auto',
                      mb: 1,
                    }}
                  >
                    {buttonText}
                  </Button>
                </Box>
              )}
            </Box>
            {isMobile && (
              <Box
                sx={{
                  bgcolor: 'white',
                  width: '100%',
                  height: 'auto',
                  mt: '30px',
                  position: 'sticky',
                  display: 'flex',
                  bottom: { xs: 0, sm: 30 },
                }}
              >
                <Button
                  onClick={handleNavigate}
                  sx={{
                    width: '100%',
                    position: 'sticky',
                    bottom: 10,
                    mx: { xs: '16px', sm: '32px' },
                    my: 1,
                  }}
                >
                  {buttonText}
                </Button>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <CartPageEmpty />
      )}
    </Box>
  );
}
