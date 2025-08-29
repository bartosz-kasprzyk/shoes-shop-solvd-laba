import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { Box, Typography } from '@mui/material';
import OrderHistoryList from '../OrderHistoryList';
import { getUserTransactions } from '../../actions/getTransactions';
import { mapTransactionToOrder } from '../../utils/mapTransactionToOrder';
import type { Transaction } from '../../types';
import { EmptyState } from '@/shared/components/ui';
import { OrderHistoryIcon } from '@/shared/icons';

export default async function OrderHistoryPage() {
  const receivedTransactions = await getUserTransactions();

  const transactions = receivedTransactions.map((transaction) =>
    mapTransactionToOrder(transaction as Transaction),
  );

  return (
    <ScrollableContainer>
      <Box
        sx={{
          padding: { xs: '20px 16px', sm: '20px 24px', md: '40px 60px' },
        }}
      >
        <Typography
          variant='h4'
          component='h2'
          sx={{
            fontWeight: 500,
            marginBottom: 6,
            color: '#1f2937',
            fontSize: { xs: 35, lg: 42 },
          }}
        >
          Order history
        </Typography>

        {transactions.length === 0 && (
          <EmptyState
            title="You haven't ordered any products yet"
            buttonText='Browse products'
            buttonHref='/products'
            icon={<OrderHistoryIcon />}
          />
        )}

        <OrderHistoryList transactions={transactions} />
      </Box>
    </ScrollableContainer>
  );
}
