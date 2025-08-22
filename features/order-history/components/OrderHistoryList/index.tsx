import { Box } from '@mui/material';
import OrderHistoryCard from '../OrderHistoryCard';
import { ShippedIcon } from '@/shared/icons';
import OrderStatus from '../OrderStatus';

const orderStatus = (
  <OrderStatus
    title='Shipped'
    icon={<ShippedIcon color='#8C9196' />}
    color='#8C9196'
  />
);

export default function OrderHistoryList() {
  const orders = [
    { id: '1', title: 'order1' },
    { id: '2', title: 'order2' },
    { id: '3', title: 'order3' },
  ];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {orders.map((order) => (
        <OrderHistoryCard key={order.id} orderStatus={orderStatus} />
      ))}
    </Box>
  );
}
