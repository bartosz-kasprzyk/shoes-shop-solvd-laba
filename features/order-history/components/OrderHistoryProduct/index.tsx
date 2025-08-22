import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function OrderHistoryProduct() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
        maxWidth: '550px',
        // border: '1px solid red',
      }}
    >
      <Image
        width={104}
        height={104}
        style={{ borderRadius: '4px' }}
        src='/shoe-welcome.png'
        alt='img'
      />
      <Box>
        <Typography
          sx={{
            fontSize: {
              xs: '16px',
              sm: '24px',
            },
            fontWeight: '500',
          }}
        >
          Nike Air Max 270
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: '12px',
              sm: '16px',
            },
            fontWeight: '500',
          }}
        >
          Women&apos;s Shoes
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: '10px',
              sm: '14px',
            },
            fontWeight: '700',
          }}
        >
          Size: 8 UK
        </Typography>
      </Box>
    </Box>
  );
}
