'use client';

import React, { useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ImageDropIcon from '../../../../shared/icons/ImageDropIcon';
import type { UploadeImageInputProps } from '../../types';

const UploadeImageInput = ({ handleAddImage }: UploadeImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 2,
        border: '1px dashed #5C5C5C',
        aspectRatio: 320 / 380,
        maxWidth: '320px',
        boxSizing: 'border-box',
      }}
      onClick={() => fileInputRef.current?.click()}
    >
      <ImageDropIcon />
      <Typography
        fontWeight={300}
        color='#5C5C5C'
        textAlign='center'
        maxWidth='172px'
      >
        Drop your image here, or select{' '}
        <Button
          sx={{
            minWidth: 0,
            padding: 0,
            textTransform: 'none',
            fontWeight: 300,
            color: '#141E7A',
            textDecoration: 'underline',
          }}
        >
          click to browse
        </Button>
      </Typography>
      <input
        type='file'
        accept='image/*'
        hidden
        ref={fileInputRef}
        onChange={handleAddImage}
      />
    </Box>
  );
};

export default UploadeImageInput;
