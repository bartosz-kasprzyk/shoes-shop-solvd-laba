import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, styled } from '@mui/material';
import { MinusIcon, PlusIcon, TrashIcon } from '@/shared/icons';
import DeleteConfirmationModal from '@/features/products/components/DeleteConfirmationModal';
import type { CartItemControlsProps } from './interface';

const CustomIconButton = styled(IconButton)(() => ({
  borderRadius: '100%',
  width: '1.8em',
  height: '1.8em',
  display: 'flex',
}));

export default function CartItemControls({
  quantity,
  name,
  handleQuantityChange,
  handleDeleteItem,
}: CartItemControlsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmDelete = () => {
    handleDeleteItem();
    setIsModalOpen(false);
  };

  const handleMinusClick = () => {
    if (quantity === 1) {
      setIsModalOpen(true);
    } else {
      handleQuantityChange(quantity - 1);
    }
  };

  return (
    <Box
      alignSelf={'end'}
      justifyContent={'space-between'}
      width={'100%'}
      flexWrap={'nowrap'}
      alignItems={'center'}
      display={'flex'}
    >
      <Box
        display={'flex'}
        gap={{ xs: 1, sm: 2 }}
        minWidth={0}
        alignItems={'center'}
      >
        <Box
          display='flex'
          gap={{ xs: 1, sm: 2 }}
          alignItems='center'
          flex={10}
          justifyContent='space-between'
          minWidth={0}
        >
          <CustomIconButton
            onClick={handleMinusClick}
            aria-label='Decrease quantity'
            sx={{
              background: 'color-mix(in srgb, black 10%, transparent)',
              padding: 0,
              fontSize: { xs: '1em', sm: '0.65em' },
            }}
          >
            <MinusIcon sx={{ height: '50%', width: '50%' }} />
          </CustomIconButton>
          <Typography
            fontSize={{ xs: '1em', sm: '0.85em' }}
            color='#494949'
            component='p'
            sx={{
              display: 'flex',
              width: '1ch',
              justifyContent: 'center',
            }}
          >
            {quantity}
          </Typography>
          <CustomIconButton
            onClick={() => handleQuantityChange(quantity + 1)}
            aria-label='Increase quantity'
            sx={{
              background: '#FFD7D6',
              padding: 0,
              fontSize: { xs: '1em', sm: '0.65em' },
            }}
          >
            <PlusIcon sx={{ height: '50%', width: '50%' }} />
          </CustomIconButton>
        </Box>
        <Typography
          fontSize={{ xs: '1em', sm: '0.85em' }}
          display={{ xs: 'none', lg: 'block' }}
          color='#494949'
          component='p'
        >
          Quantity
        </Typography>
      </Box>

      <Button
        onClick={() => setIsModalOpen(true)}
        sx={{
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '1em',
          borderRadius: '8px',
          paddingX: 1,
          transition:
            'background-color 0.2s ease-in-out, transform 0.2s ease-in-out, color 0.2s ease-in-out',
          backgroundColor: 'transparent',
          color: 'var(--color-primary)',

          '&:hover': {
            backgroundColor:
              'color-mix(in srgb, var(--color-primary) 10%, transparent)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        }}
      >
        <Box
          fontSize={{ xs: '1em', sm: '0.85em' }}
          display={'flex'}
          gap={1}
          alignItems={'center'}
        >
          <TrashIcon sx={{ fontSize: '1em' }} />
          <Typography fontSize='1em' color='#6E7278' component='p'>
            Delete
          </Typography>
        </Box>
      </Button>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleConfirmDelete}
        header='Remove from Cart'
        text={`Are you sure you want to remove ${name} from your cart?`}
      />
    </Box>
  );
}
