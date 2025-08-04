'use client';

import React from 'react';
import { Box, Avatar } from '@mui/material';
import type { UploadedImagesContainerProps } from '../../types';
import { Label } from '@/shared/components/ui';
import UploadeImageInput from '../UploadImageInput';
import UploadedImageCard from '../UploadedImageCard/indes';

const UploadedImagesContainer = ({
  images,
  setImages,
}: UploadedImagesContainerProps) => {
  const addImage = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setImages((prev) => [...prev, { file, preview: objectUrl }]);
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) addImage(file);
    event.target.value = '';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file.type.startsWith('image/')) {
      addImage(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Box display='flex' flexDirection='column' width='100%' maxWidth='690px'>
        <Label id='product-images'>Product images</Label>
        <Box
          display='grid'
          gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }}
          gap={{ xs: 3, xl: 6 }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {images.map(({ preview }, idx) => (
            <UploadedImageCard key={preview} idx={idx} preview={preview} />
          ))}
          <UploadeImageInput handleAddImage={handleAddImage} />
        </Box>
      </Box>
    </>
  );
};

export default UploadedImagesContainer;
