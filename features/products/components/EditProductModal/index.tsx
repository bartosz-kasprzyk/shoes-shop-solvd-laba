'use client';

import { Modal } from '@mui/material';
import type { EditModalProps } from '../../types';
import AddProductForm from '../AddProductForm';
import { useState } from 'react';
import ImageUploadGrid from '@/features/products/components/UploadedImagesContainer';
import { Box, Typography } from '@mui/material';
import type { ImageData } from '@/features/products/types';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { Button } from '@/shared/components/ui';
import useUser from '@/shared/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { fetchMyProducts } from '@/app/api/products';
import { CloseIcon } from '@/shared/icons';

export default function EditProductModal({
  isOpen,
  onClose,
  productId,
}: EditModalProps) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [imagesError, setImagesError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { session } = useUser();
  const id = session?.user.id as number;
  const token = session?.user.accessToken as string;

  const { data } = useQuery({
    queryKey: ['myProducts', id],
    queryFn: () => fetchMyProducts(token, id),
    enabled: !!token && !!id,
  });

  const productData = data?.data.find((p) => p.id === productId);

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
              padding: '53px 80px 53px 40px',
              position: 'relative',
            }}
          >
            <CloseIcon
              style={{ position: 'absolute', right: '20px', top: '20px' }}
              onClick={onClose}
            />
            <Typography variant='h3' fontWeight={500}>
              Edit product
            </Typography>
            <Typography
              sx={{ color: '#5C5C5C', fontWeight: 300, maxWidth: '890px' }}
            >
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs. The passage is
              attributed to an unknown typesetter in the 15th century who is
              thought to have scrambled parts of Ciceros De Finibus Bonorum et
              Malorum for use in a type specimen book. It usually begins with:
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
