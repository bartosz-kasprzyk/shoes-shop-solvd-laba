'use client';

import { Box, List, ListItem, Typography } from '@mui/material';
import CartListItem from '../CartListItem';
import { Fragment } from 'react';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { useCartDetails } from '../CartDetailsContext';

export default function CartList({ isMobile }: { isMobile: boolean }) {
  const { cartItems, handleDeleteItem, handleQuantityChange } =
    useCartDetails();

  const cartContent = (
    <Box pr={{ xs: 0, md: 1 }}>
      <List>
        {cartItems.map((item, id) => (
          <Fragment key={`${item.id}-${item.size}`}>
            <ListItem sx={{ padding: 0 }}>
              <CartListItem
                cartItem={item}
                handleDeleteItem={() =>
                  handleDeleteItem(String(item.id), item.size)
                }
                handleQuantityChange={(newQuantity: number) =>
                  handleQuantityChange(String(item.id), item.size, newQuantity)
                }
              />
            </ListItem>
            {id !== cartItems.length - 1 && (
              <Box
                width={'100%'}
                paddingY={{ xs: '16px', md: '60px' }}
                height={'0px'}
              ></Box>
            )}
          </Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={
        !isMobile
          ? {
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }
          : {}
      }
    >
      <Box fontSize={{ xs: 20, md: 30 }}>
        <Typography
          height={'100%'}
          marginBottom='30px'
          fontSize='1.5em'
          fontWeight={500}
          borderBottom={{
            xs: '1px color-mix(in srgb, black 10%, transparent) solid',
            md: 'none',
          }}
        >
          Cart
        </Typography>
      </Box>
      <Box
        px={{ xs: 2, md: 0 }}
        sx={
          !isMobile
            ? {
                pb: 1,
                flexGrow: 1,
                minHeight: 0,
                height: '100%',
              }
            : {}
        }
      >
        {isMobile ? (
          cartContent
        ) : (
          <ScrollableContainer>{cartContent}</ScrollableContainer>
        )}
      </Box>
    </Box>
  );
}
