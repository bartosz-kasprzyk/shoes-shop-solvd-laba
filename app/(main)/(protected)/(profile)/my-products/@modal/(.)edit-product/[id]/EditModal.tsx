'use client';

import EditProductContent from '@/features/products/components/EditProductContent';
import type { ProductFromServer } from '@/features/products/types/shared.interface';
import { CloseIcon } from '@/shared/icons';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function EditModal({
  productData,
}: {
  productData: ProductFromServer | undefined;
}) {
  const router = useRouter();
  return (
    <Box
      position={{ xs: 'relative', md: 'fixed' }}
      top={0}
      width={{ xs: '100%', sm: '100vw' }}
      height={{ xs: '100%', sm: '100vh' }}
      boxSizing={'border-box'}
      left={0}
      overflow={'hidden'}
      zIndex={{ xs: 0, sm: 3000 }}
      padding={{ xs: 0, md: 3 }}
      sx={{
        backgroundColor: { xs: 'white', md: 'rgba(243, 243, 243, 0.9)' },
      }}
    >
      <Box
        maxWidth={'1480px'}
        width={'100%'}
        height={'100%'}
        boxSizing={'border-box'}
        overflow={'hidden'}
        position={'relative'}
        justifySelf={'center'}
        bgcolor={'white'}
      >
        <EditProductContent
          productData={productData}
          closeButton={
            <CloseIcon
              sx={{
                cursor: 'pointer',
                position: 'absolute',
                right: '20px',
                top: '20px',
                display: { xs: 'none', md: 'block' },
              }}
              onClick={() => router.back()}
            />
          }
        />
      </Box>
    </Box>
  );
}
