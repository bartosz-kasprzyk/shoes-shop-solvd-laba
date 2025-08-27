'use client';

import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import AddProductForm from '@/features/products/components/AddProductForm';
import ImageUploadGrid from '@/features/products/components/UploadedImagesContainer';
import type { ImageData } from '@/features/products/types';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { Button } from '@/shared/components/ui';

export default function AddProductsPage() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [imagesError, setImagesError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  return (
    <ScrollableContainer>
      <Box
        width='100%'
        p={{ xs: '20px', md: '50px' }}
        sx={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '35px',
          position: 'relative',
          overflowX: 'auto',
        }}
      >
        <Typography variant='h3' fontWeight={500}>
          Add a product
        </Typography>
        <Typography
          sx={{ color: '#5C5C5C', fontWeight: 300, maxWidth: '890px' }}
        >
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
          <AddProductForm
            images={images}
            setImagesError={setImagesError}
            setImages={setImages}
            mode='create'
            formId='add-product-form'
            onLoadingChange={setLoading}
          />
          <ImageUploadGrid
            images={images}
            setImages={setImages}
            setImagesError={setImagesError}
            imagesError={imagesError}
          />
        </Box>
        <Button
          form='add-product-form'
          type='submit'
          disabled={loading}
          sx={{
            width: '152px',
            position: { xs: 'static', md: 'absolute' },
            right: { md: '50px' },
            top: { md: '50px' },
          }}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    </ScrollableContainer>
  );
}
