import { DropdownArrowIcon } from '@/shared/icons';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import OrderHistoryProduct from '../OrderHistoryProduct';
import type { Order } from '../../types';
import DownloadPdfFile from '../DownloadPdfButton';

interface OrderHistoryCardProps {
  transaction: Order;
  orderStatus: React.ReactNode;
}

function Text({
  title,
  value,
  hidden,
  flex,
}: {
  title?: string;
  value?: React.ReactNode;
  hidden?: boolean;
  flex?: number;
}) {
  return (
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: '14px',
        color: '#8C9196',
        display: hidden ? { xs: 'none', sm: 'block' } : 'block',
        flex: flex ? flex : 'none',
        flexBasis: 'auto',
        minWidth: '12ch',
      }}
    >
      {title}
      <span style={{ color: '#1E2832' }}>{value}</span>
    </Typography>
  );
}

export default function OrderHistoryCard({
  transaction,
  orderStatus,
}: OrderHistoryCardProps) {
  return (
    <Accordion
      sx={{
        backgroundColor: '#FAFAFA',
        border: 'none',
        boxShadow: 'none',
        '&:before': {
          display: 'none',
        },
        borderRadius: '4px',
        minWidth: '340px',
      }}
    >
      <AccordionSummary
        expandIcon={<DropdownArrowIcon />}
        sx={{
          mr: 3,
          '& .MuiAccordionSummary-content': {
            display: 'flex',

            alignItems: 'stretch',
            gap: 3,
            pr: 3,
          },
        }}
      >
        <Box
          sx={{
            flex: '1',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Text value={`#${transaction.orderId}`} />
            <Text title={transaction.date} hidden />
          </Box>

          <Box
            sx={{
              '@media (max-width:1150px)': {
                display: 'none',
              },
            }}
          >
            <Text
              title='Products '
              value={transaction.productsQuantity}
              hidden
            />
          </Box>

          <Text
            title='Summary: '
            value={new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(transaction.amount !== 0 ? transaction.amount / 100 : 0)}
          />
        </Box>

        {orderStatus}
      </AccordionSummary>

      <AccordionDetails>
        {/*   top element   */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 5 },
            justifyContent: 'space-between',
            borderTop: '1px solid #E7EBEF',
            py: '20px',
          }}
        >
          <Text title='Delivery: ' value={transaction.delivery} flex={1} />

          <Text title='Contacts: ' value={transaction.contacts} flex={1} />

          <Text title='Payment: ' value={transaction.payment} flex={1} />
        </Box>

        {/*   middle element   */}
        {transaction.products.map((product) => (
          <Box
            key={product.id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              justifyContent: 'space-between',
              alignItems: {
                xs: 'stretch',
                md: 'center',
              },
              borderTop: '1px solid #E7EBEF',
              py: '20px',
            }}
          >
            <OrderHistoryProduct product={product} />

            <Text title='Quantity: ' value={product.quantity} />

            <Text
              title='Price: '
              value={new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(product.price !== 0 ? product.price : 0)}
            />
          </Box>
        ))}

        {/*   bottom element   */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #E7EBEF',
            pt: '20px',
          }}
        >
          <DownloadPdfFile transaction={transaction} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
