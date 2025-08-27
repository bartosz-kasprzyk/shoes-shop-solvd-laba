import { Box } from '@mui/material';
import OrderHistoryCard from '../OrderHistoryCard';
import { ShippedIcon } from '@/shared/icons';
import OrderStatus from '../OrderStatus';
import type { Order } from '../../types';

const orderStatus = (
  <OrderStatus
    title='Shipped'
    icon={<ShippedIcon color='#8C9196' />}
    color='#8C9196'
  />
);

interface OrderHistoryListProps {
  transactions: Order[];
}

export default function OrderHistoryList({
  transactions,
}: OrderHistoryListProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {transactions.map((transaction) => (
        <OrderHistoryCard
          key={transaction.orderId}
          transaction={transaction}
          orderStatus={orderStatus}
        />
      ))}
    </Box>
  );
}
