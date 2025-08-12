'use client';

import React from 'react';
import { Box, Avatar } from '@mui/material';
import type { UploadedImageCardProps } from '../../types';
import { ImageOverlay } from '@/shared/components/ui';

const UploadedImageCard = ({
  idx,
  preview,
  deleteImage,
}: UploadedImageCardProps) => {
  return (
    <ImageOverlay variant='delete' onDelete={() => deleteImage(idx)}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          aspectRatio: 320 / 380,
          overflow: 'hidden',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      >
        <Avatar
          src={preview}
          variant='square'
          sx={{ width: '100%', height: '100%' }}
          alt={`Image ${idx}`}
        />
      </Box>
    </ImageOverlay>
  );
};

export default UploadedImageCard;
