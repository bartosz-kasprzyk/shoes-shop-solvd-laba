'use client';

import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import AddProductForm from '@/features/products/components/AddProductForm';
import ImageUploadGrid from '@/features/products/components/UploadedImagesContainer';
import type { ImageData } from '@/features/products/interfaces/UploadedImagesContainerProps';

export default function AddProductsPage() {
  const [images, setImages] = useState<ImageData[]>([]);
  return (
    <Box
      width='100%'
      m={{ xs: '20px', md: '50px' }}
      maxWidth='1400px'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '35px',
      }}
    >
      <Typography variant='h3' fontWeight={500}>
        Add a product
      </Typography>
      <Typography sx={{ color: '#5C5C5C', fontWeight: 300, maxWidth: '890px' }}>
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
        laying out print, graphic or web designs. The passage is attributed to
        an unknown typesetter in the 15th century who is thought to have
        scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a
        type specimen book. It usually begins with:
      </Typography>
      <Box
        sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}
        flexDirection={{ xs: 'column', md: 'row' }}
      >
        <AddProductForm images={images} />
        <ImageUploadGrid images={images} setImages={setImages} />
      </Box>
    </Box>
  );
}
