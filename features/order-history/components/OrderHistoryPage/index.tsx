import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { Box, Typography } from '@mui/material';
import OrderHistoryList from '../OrderHistoryList';
import { getUserTransactions } from '../../actions/getTransactions';
import { mapTransactionToOrder } from '../../utils/mapTransactionToOrder';
import type { Transaction } from '../../types';
import { OrderHistoryIcon } from '@/shared/icons';
import Button from '@/shared/components/ui/Button';
import Link from 'next/link';

export default async function OrderHistoryPage() {
  const receivedTransactions = await getUserTransactions();

  const transactions = receivedTransactions.map((transaction) =>
    mapTransactionToOrder(transaction as Transaction),
  );

  if (transactions.length === 0) {
    return (
      <Box sx={{ flex: 1, padding: { xs: '20px 30px', md: '40px 60px' } }}>
        <Typography
          variant='h4'
          component='h2'
          sx={{
            fontWeight: 600,
            marginBottom: 6,
            color: '#1f2937',
            fontSize: { xs: 35, lg: 42 },
          }}
        >
          Order history
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: { xs: '50px', md: '150px' },
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              backgroundColor: '#f3f4f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 3,
            }}
          >
            <OrderHistoryIcon />
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 600,
              marginBottom: 3,
              color: '#1f2937',
              fontSize: { xs: 16, lg: 22 },
            }}
          >
            You haven&apos;t ordered any products yet
          </Typography>

          <Link href='/products' passHref>
            <Button variant='primary' sx={{ p: 1, px: 2 }}>
              Browse products
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }

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

        <OrderHistoryList transactions={transactions} />
      </Box>
    </ScrollableContainer>
  );
}
