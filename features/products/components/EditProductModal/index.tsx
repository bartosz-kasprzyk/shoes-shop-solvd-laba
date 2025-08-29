'use client';

import { Modal } from '@mui/material';
import type { EditModalProps, MyProductsInfiniteData } from '../../types';
import AddProductForm from '../AddProductForm';
import { useState } from 'react';
import ImageUploadGrid from '@/features/products/components/UploadedImagesContainer';
import { Box, Typography } from '@mui/material';
import type { ImageData } from '@/features/products/types';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { Button } from '@/shared/components/ui';
import useUser from '@/shared/hooks/useUser';
import { CloseIcon } from '@/shared/icons';
import { useQueryClient } from '@tanstack/react-query';

export default function EditProductModal({
  isOpen,
  onClose,
  productId,
}: EditModalProps) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [imagesError, setImagesError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { session } = useUser();
  const id = session?.user.id as number;

  const cachedData = queryClient.getQueryData<MyProductsInfiniteData>([
    'myProducts',
    id,
  ]);

  const allProducts = cachedData?.pages.flatMap((page) => page.data) ?? [];
  const productData = allProducts.find((p) => p.id === productId);

  return (
    <>
      <ScrollableContainer>
        <Modal
          open={isOpen}
          onClose={onClose}
          sx={{
            overflowY: 'auto',
            padding: 3,
            '& .mui-4nmryk-MuiBackdrop-root-MuiModal-backdrop': {
              backgroundColor: 'rgba(243, 243, 243, 0.9)',
            },
          }}
        >
          <Box
            m={{ xs: '20px auto', md: '50px auto' }}
            maxWidth='1487px'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '35px',
              backgroundColor: '#fff',
              padding: { xs: '53px 24px', sm: '53px 80px 53px 40px' },
              position: 'relative',
            }}
          >
            <CloseIcon
              style={{
                position: 'absolute',
                right: '20px',
                top: '20px',
                cursor: 'pointer',
              }}
              onClick={onClose}
            />
            <Typography variant='h3' fontWeight={500}>
              Edit product
            </Typography>
            <Typography
              sx={{ color: '#5C5C5C', fontWeight: 300, maxWidth: '890px' }}
            >
              Update your product information below. You can edit the product
              name, price, description, category, color, brand, sizes, and
              images. Make sure to upload at least one image before saving. All
              changes will be reflected immediately in your product list.
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
                productId={productId}
                onClose={onClose}
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
          </Box>
        </Modal>
      </ScrollableContainer>
    </>
  );
}
