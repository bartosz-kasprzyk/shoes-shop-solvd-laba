'use client';

import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';

import { DeleteIcon, CartLogoIcon } from '@/shared/icons';
import type { ImageOverlayProps } from './interface';
import DeleteConfirmationModal from '@/features/products/components/DeleteConfirmationModal';
import { createPortal } from 'react-dom';

export default function ImageOverlay({
  children,
  variant,
  onDelete,
}: ImageOverlayProps) {
  const [isDeleteImageModalOpen, setIsDeleteImageModalOpen] = useState(false);
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (variant === 'delete') {
      onDelete?.();
    }
    if (variant === 'deleteWithModal') {
      setIsDeleteImageModalOpen(true);
    }
  };
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        display: 'inline-block',
        ...((variant === 'delete' || variant === 'deleteWithModal') && {
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
        onClick={handleClick}
        aria-label={
          variant === 'delete' || variant === 'deleteWithModal'
            ? 'Delete item'
            : 'Add to cart'
        }
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
            <CartLogoIcon />
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
      {isDeleteImageModalOpen &&
        typeof window !== 'undefined' &&
        createPortal(
          <DeleteConfirmationModal
            isOpen={true}
            onClose={() => setIsDeleteImageModalOpen(false)}
            onDelete={() => onDelete?.()}
            header='Are you sure to delete product image'
            text='This image will be permanently removed from your product. Please confirm if you want to proceed with deletion.'
          />,
          document.body,
        )}
    </Box>
  );
}
