'use client';

import { Box, List, ListItem, Typography } from '@mui/material';
import CartListItem from '../CartListItem';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { useCartDetails } from '../CartDetailsContext';
import CartListItemSkeleton from '../CartListItem/skeleton';
import { useCart } from '@/shared/hooks/useCart';

export default function CartList() {
  const {
    cartItems,
    handleDeleteItem,
    handleQuantityChange,
    isCartDetailsLoading,
  } = useCartDetails();
  const { totalItems } = useCart();

  const cartContent = cartItems.map((item, id) => (
    <ListItem key={`${item.id}-${item.size}`} sx={{ padding: 0 }}>
      <CartListItem
        cartItem={item}
        handleDeleteItem={() => handleDeleteItem(String(item.id), item.size)}
        handleQuantityChange={(newQuantity: number) =>
          handleQuantityChange(String(item.id), item.size, newQuantity)
        }
      />
    </ListItem>
  ));

  const seletonCartContent = [...Array(totalItems).keys()].map((item) => (
    <ListItem key={item} sx={{ padding: 0 }}>
      <CartListItemSkeleton />
    </ListItem>
  ));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box fontSize={{ xs: 20, md: 30 }}>
        <Typography
          variant='h4'
          marginBottom='20px'
          fontSize={{ xs: '24px', md: '32px' }}
          fontWeight={500}
          px={2}
          py={1}
          borderTop={{
            xs: '1px color-mix(in srgb, black 10%, transparent) solid',
            sm: 'none',
          }}
          borderBottom={{
            xs: '1px color-mix(in srgb, black 10%, transparent) solid',
            sm: 'none',
          }}
        >
          Cart
        </Typography>
      </Box>
      <Box
        px={{ xs: 2, md: 0 }}
        sx={{
          pb: 1,
          flexGrow: 1,
          minHeight: 0,
          height: '100%',
        }}
      >
        <ScrollableContainer>
          <Box pr={{ xs: 0, md: 1 }}>
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: '16px', md: '60px' },
              }}
            >
              {!isCartDetailsLoading ? cartContent : seletonCartContent}
            </List>
          </Box>
        </ScrollableContainer>
      </Box>
    </Box>
  );
}
