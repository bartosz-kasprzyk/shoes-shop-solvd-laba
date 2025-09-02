'use client';

import type { ChangeEvent, DragEvent } from 'react';
import React from 'react';
import { Box, Typography } from '@mui/material';
import type { UploadedImagesContainerProps } from '../../types';
import { Label } from '@/shared/components/ui';
import UploadeImageInput from '../UploadImageInput';
import UploadedImageCard from '../UploadedImageCard';
import imageCompression from 'browser-image-compression';

const UploadedImagesContainer = ({
  images,
  setImages,
  setImagesError,
  imagesError,
}: UploadedImagesContainerProps) => {
  const MAX_IMAGES = 7;

  const compressAndAddImages = async (files: File[]) => {
    if (images.length + files.length > MAX_IMAGES) {
      setImagesError(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    setImagesError('');

    const remainingSlots = MAX_IMAGES - images.length;
    const validFiles = files.slice(0, remainingSlots);

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressedFiles = await Promise.all(
        validFiles.map((file) => imageCompression(file, options)),
      );

      const newImages = compressedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prev) => [...prev, ...newImages]);
    } catch {
      setImagesError('Failed to compress image.');
    }
  };

  const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      compressAndAddImages(filesArray);
    }
    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/'),
    );

    if (files.length > 0) {
      compressAndAddImages(files);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const deleteImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <>
      <Box display='flex' flexDirection='column' width='100%' maxWidth='690px'>
        <Label id='product-images' required>
          Product images
        </Label>
        <Box
          display='grid'
          gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }}
          gap={{ xs: 3, xl: 6 }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          position='relative'
          paddingBottom='30px'
        >
          {images.map(({ preview }, idx) => (
            <UploadedImageCard
              key={preview}
              idx={idx}
              preview={preview}
              deleteImage={deleteImage}
              variant={
                preview.startsWith('blob') ? 'delete' : 'deleteWithModal'
              }
            />
          ))}
          {images.length < MAX_IMAGES && (
            <UploadeImageInput handleAddImage={handleAddImage} />
          )}
          <Typography
            style={{
              position: 'absolute',
              bottom: 0,
              color: 'var(--color-primary) !important',
              marginBottom: '5px',
              marginLeft: '10px',
              fontSize: '12px',
            }}
          >
            {imagesError}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default UploadedImagesContainer;
