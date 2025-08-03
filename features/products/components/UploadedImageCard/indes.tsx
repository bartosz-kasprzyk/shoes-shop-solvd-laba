'use client';

import React from 'react';
import { Box, Avatar } from '@mui/material';

const UploadedImageCard = ({ idx, preview }: any) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          aspectRatio: 320 / 380,
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid #ccc',
          maxWidth: '320px',
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
    </>
  );
};

export default UploadedImageCard;
