'use client';

import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddToCartIcon from './icons/bag';
import DeleteIcon from './icons/delete';
import type { ImageOverlayProps } from './interface';

export default function ImageOverlay({ children, variant }: ImageOverlayProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        ...(variant === 'delete' && {
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            borderRadius: 'inherit',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: 1,
          },
          '&:hover::after': {
            opacity: 1,
          },
        }),
        '&:hover .overlayButton': {
          opacity: 1,
        },
      }}
    >
      {children}
      <IconButton
        className='overlayButton'
        onClick={(event) => {
          event.preventDefault();
          if (variant === 'delete') {
            alert('Deleted!');
          } else {
            alert('Added to cart!');
          }
        }}
        aria-label={variant === 'delete' ? 'Delete item' : 'Add to cart'}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80px',
          height: '80px',
          bgcolor: 'rgba(255, 255, 255, 0.75)',
          boxShadow: '0px 4px 10px 0px #00000026',
          opacity: 0,
          transition:
            'opacity 0.3s ease, background-color 0.3s ease, boxShadow 0.3s ease',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            boxShadow:
              '0px 4px 10px 0px color-mix(in srgb, var(--color-primary) 50%, #00000026)',
          },
        }}
      >
        {variant === 'addToCart' ? (
          <>
            <AddToCartIcon />
            <Typography
              sx={{
                fontSize: '8px',
                marginTop: '8px',
                lineHeight: '100%',
                fontWeight: 500,
              }}
            >
              {'Add to Cart'}
            </Typography>
          </>
        ) : (
          <DeleteIcon />
        )}
      </IconButton>
    </Box>
  );
}
