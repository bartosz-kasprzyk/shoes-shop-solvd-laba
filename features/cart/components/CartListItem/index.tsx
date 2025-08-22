'use client';

import type { CartListItemProps } from '../interface';
import {
  Button,
  Typography,
  Box,
  IconButton,
  styled,
  Link,
} from '@mui/material';
import { useState } from 'react';
import NextLink from 'next/link';
import { MinusIcon, PlusIcon, TrashIcon } from '@/shared/icons';
import DeleteConfirmationModal from '@/features/products/components/DeleteConfirmationModal';

const CustomIconButton = styled(IconButton)(() => ({
  borderRadius: '100%',
  width: '1.8em',
  height: '1.8em',
  display: 'flex',
}));

export default function CartListItem({
  cartItem,
  handleDeleteItem,
  handleQuantityChange,
}: CartListItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmDelete = () => {
    handleDeleteItem();
    setIsModalOpen(false);
  };

  const handleMinusClick = () => {
    if (cartItem.quantity === 1) {
      setIsModalOpen(true);
    } else {
      handleQuantityChange(cartItem.quantity - 1);
    }
  };

  return (
    <Box
      sx={{
        height: { xs: 100, sm: 150, lg: 200 },
        fontSize: { xs: 12, sm: 20, lg: 30 },
        width: '100%',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'row',
        gap: { xs: '15px', sm: '45px' },
        position: 'relative',
        borderRadius: '0px',
      }}
    >
      <Link
        component={NextLink}
        height='100%'
        display={'block'}
        sx={{ aspectRatio: '1/1' }}
        href={`/product/${cartItem.id}`}
      >
        <Box
          height='100%'
          width='auto'
          component='img'
          src={cartItem.img.src}
          alt={cartItem.name}
          title={cartItem.name}
          sx={{ aspectRatio: '1/1', objectFit: 'cover' }}
        ></Box>
      </Link>
      <Box
        width={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        overflow='hidden'
      >
        <Box>
          <Box
            fontSize={'1em'}
            fontWeight={500}
            lineHeight={'normal'}
            gap={7}
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              lineHeight={'inherit'}
              padding={0}
              whiteSpace={'nowrap'}
              overflow='hidden'
              textOverflow='ellipsis'
              fontSize={'inherit'}
              fontWeight={'inherit'}
            >
              <Link
                component={NextLink}
                lineHeight='normal'
                mb={0}
                color='inherit'
                href={`/product/${cartItem.id}`}
                underline='hover'
              >
                {cartItem.name}
              </Link>
            </Typography>
            <Typography
              lineHeight={'inherit'}
              fontSize={'inherit'}
              fontWeight={'inherit'}
            >
              ${cartItem.price}
            </Typography>
          </Box>
          <Typography
            fontSize={{ xs: '1em', sm: '0.7em' }}
            fontWeight={500}
            color='color-mix(in srgb, black 60%, transparent)'
            component='p'
          >
            {cartItem.gender}&apos;s Shoes | Size {cartItem.size}
          </Typography>
          <Typography
            display={{ xs: 'none', sm: 'block' }}
            fontSize='0.85em'
            fontWeight={'600'}
            color='var(--color-primary)'
            component='p'
          >
            {cartItem.available ? 'In Stock' : 'Out of Stock'}
          </Typography>
        </Box>
        <Box
          alignSelf={'end'}
          justifyContent={'space-between'}
          width={{ xs: '100%', sm: 'auto' }}
          flexWrap={'nowrap'}
          alignItems={'center'}
          display={'flex'}
        >
          <Box display={'flex'} gap={{ xs: 1, sm: 2 }} alignItems={'center'}>
            <Box
              display='flex'
              gap={{ xs: 1, sm: 2 }}
              alignItems='center'
              justifyContent='space-between'
              minWidth={{ xs: 75, sm: 120, lg: 160 }}
            >
              <CustomIconButton
                onClick={handleMinusClick}
                sx={{
                  background: 'color-mix(in srgb, black 10%, transparent)',
                  padding: 0,
                  fontSize: { xs: '1em', sm: '0.85em' },
                }}
              >
                <MinusIcon sx={{ height: '50%', width: '50%' }} />
              </CustomIconButton>
              <Typography
                fontSize={{ xs: '1em', sm: '0.85em' }}
                color='#494949'
                component='p'
              >
                {cartItem.quantity}
              </Typography>
              <CustomIconButton
                onClick={() => handleQuantityChange(cartItem.quantity + 1)}
                sx={{
                  background: '#FFD7D6',
                  padding: 0,
                  fontSize: { xs: '1em', sm: '0.85em' },
                }}
              >
                <PlusIcon sx={{ height: '50%', width: '50%' }} />
              </CustomIconButton>
            </Box>
            <Typography
              fontSize={{ xs: '1em', sm: '0.85em' }}
              color='#494949'
              component='p'
            >
              Quantity
            </Typography>
          </Box>
          <Box
            bgcolor={'#8B8E93'}
            width={2}
            display={{ xs: 'none', sm: 'flex' }}
            flexDirection={'column'}
            flexWrap={'nowrap'}
            marginX={'15px'}
            marginY={'auto'}
            height={'24.5px'}
          ></Box>

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
        </Box>
      </Box>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleConfirmDelete}
        header='Remove from Cart'
        text={`Are you sure you want to remove ${cartItem.name} from your cart?`}
      />
    </Box>
  );
}
