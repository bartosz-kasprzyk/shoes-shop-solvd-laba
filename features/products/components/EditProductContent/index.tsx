'use client';

import { Modal } from '@mui/material';
import type { EditModalProps, MyProductsInfiniteData } from '../../types';
import AddProductForm from '../AddProductForm';
import type { ReactNode } from 'react';
import { useState } from 'react';
import ImageUploadGrid from '@/features/products/components/UploadedImagesContainer';
import { Box, Typography } from '@mui/material';
import type { ImageData } from '@/features/products/types';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { Button } from '@/shared/components/ui';
import useUser from '@/shared/hooks/useUser';
import { CloseIcon } from '@/shared/icons';
import { useQueryClient } from '@tanstack/react-query';
import type { ProductFromServer } from '../../types/shared.interface';

export default function EditProductContent({
  productData,
  closeButton,
}: {
  productData: ProductFromServer | undefined;
  closeButton?: ReactNode;
}) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [imagesError, setImagesError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { session } = useUser();
  const id = session?.user.id as number;

  return (
    <>
      <ScrollableContainer>
        <Box
          // m={{ xs: '20px auto', md: '50px auto' }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '35px',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            padding: '53px 40px 53px 40px',
            position: 'relative',
          }}
        >
          {closeButton}
          <Typography variant='h3' fontWeight={500}>
            Edit product
          </Typography>
          <Typography
            sx={{ color: '#5C5C5C', fontWeight: 300, maxWidth: '890px' }}
          >
            Update your product information below. You can edit the product
            name, price, description, category, color, brand, sizes, and images.
            Make sure to upload at least one image before saving. All changes
            will be reflected immediately in your product list.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'space-between',
            }}
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <AddProductForm
              images={images}
              setImagesError={setImagesError}
              setImages={setImages}
              mode='update'
              initialData={productData}
              formId='edit-product-form'
              onLoadingChange={setLoading}
              productId={productData?.id}
            />
            <ImageUploadGrid
              images={images}
              setImages={setImages}
              setImagesError={setImagesError}
              imagesError={imagesError}
            />
          </Box>
          <Button
            form='edit-product-form'
            type='submit'
            aria-label='Save'
            disabled={loading}
            sx={{
              width: '152px',
              position: { xs: 'static', md: 'absolute' },
              right: { md: '80px' },
              top: { md: '53px' },
            }}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
          <Box width={1} height={100}>
            &nbsp;
          </Box>
        </Box>
      </ScrollableContainer>
    </>
  );
}
