'use client';

import { Button } from '@mui/material';
import { generateInvoicePdf } from '../../utils/generateInvoicePdf';
import { PdfIcon } from '@/shared/icons';
import type { Order } from '../../types';

export default function DownloadPdfFile({
  transaction,
}: {
  transaction: Order;
}) {
  return (
    <Button
      onClick={() => generateInvoicePdf(transaction)}
      sx={{
        fontWeight: 700,
        fontSize: '12px',
        color: '#1E2832',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        padding: 0,
        minWidth: 'auto',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'transparent',
          color: '#1E2832',
          textDecoration: 'underline',
        },
      }}
    >
      <PdfIcon />
      Pdf invoice download
    </Button>
  );
}
