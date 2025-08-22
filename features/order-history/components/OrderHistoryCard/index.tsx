import { DropdownArrowIcon, PdfIcon } from '@/shared/icons';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import OrderHistoryProduct from '../OrderHistoryProduct';

interface OrderHistoryCardProps {
  orderStatus: React.ReactNode;
}

function Text({
  title,
  value,
  hidden,
  flex,
}: {
  title?: string;
  value?: string;
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
      }}
    >
      {title}
      <span style={{ color: '#1E2832' }}>{value}</span>
    </Typography>
  );
}

export default function OrderHistoryCard({
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
          height: '56px',
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
            // border: '1px solid red',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Text value='#987654' />
            <Text
              title={new Intl.DateTimeFormat('de-DE').format(new Date())}
              hidden
            />{' '}
          </Box>

          <Text title='Products ' value='1' hidden />

          <Text
            title='Summary: '
            value={new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(117)}
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
            justifyContent: 'center',
            borderTop: '1px solid #E7EBEF',
            // border: '1px solid red',
            py: '20px',
          }}
        >
          <Text title='Delivery: ' value='Meest, #134-45 London' flex={1} />

          <Text
            title='Contacts: '
            value='Angelina Jones, +38 (095) 12 34 567, angelina@gmail.com'
            flex={2}
          />

          <Text title='Payment: ' value='After payment' flex={1} />
        </Box>

        {/*   middle element   */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 5 },
            justifyContent: 'space-between',
            alignItems: {
              xs: 'stretch',
              md: 'center',
            },
            borderTop: '1px solid #E7EBEF',
            // border: '1px solid red',
            py: '20px',
          }}
        >
          <OrderHistoryProduct />

          <Text title='Quality: ' value='1' />

          <Text
            title='Price: '
            value={new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(117)}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            // gap: { xs: 2, md: 5 },
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #E7EBEF',
            pt: '20px',
            // border: '1px solid red',
          }}
        >
          <Link
            href='#'
            style={{
              fontWeight: 700,
              fontSize: '12px',
              color: '#1E2832',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <PdfIcon />
            Pdf invoice download
          </Link>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '14px',
              color: '#8C9196',
            }}
          >
            Discount:
            <span style={{ color: '#EB5656' }}>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(14245.32)}
            </span>
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
