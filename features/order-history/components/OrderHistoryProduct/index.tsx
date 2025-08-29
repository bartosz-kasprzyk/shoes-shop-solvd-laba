import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import type { OrderProduct } from '../../types';

interface OrderHistoryProductProps {
  product: OrderProduct;
}

export default function OrderHistoryProduct({
  product,
}: OrderHistoryProductProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        gap: '20px',
        maxWidth: '550px',
      }}
    >
      <Image
        width={104}
        height={104}
        style={{ borderRadius: '4px', objectFit: 'cover' }}
        src={product.imageUrl}
        alt={product.name}
      />
      <Box>
        <Typography
          sx={{
            fontSize: {
              xs: '16px',
              sm: '24px',
            },
            fontWeight: '500',
            transition:
              'font-size 0.3s ease-in-out, line-height 0.3s ease-in-out',
          }}
        >
          {product.name}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: '12px',
              sm: '16px',
            },
            fontWeight: '500',
            transition:
              'font-size 0.3s ease-in-out, line-height 0.3s ease-in-out',
          }}
        >
          {`${product.gender.charAt(0).toUpperCase() + product.gender.slice(1).toLowerCase()}'s Shoes`}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: '10px',
              sm: '14px',
            },
            fontWeight: '700',
            transition:
              'font-size 0.3s ease-in-out, line-height 0.3s ease-in-out',
          }}
        >
          {`Size: ${product.size} EU`}
        </Typography>
      </Box>
    </Box>
  );
}
