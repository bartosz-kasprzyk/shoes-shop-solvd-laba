'use client';

import items from '@/app/_mock/mockListItems';
import { Box, List, ListItem } from '@mui/material';
import CartListItem from '../CartListItem';
import { Fragment, useState } from 'react';

export default function CartList() {
  const [cartItems, setCartItems] = useState(items);
  const handleDelete = (deletedId: number): void => {
    setCartItems((prev) => prev.filter((p) => p.id !== deletedId));
  };
  return (
    <List
      sx={{
        maxWidth: 1487,
      }}
    >
      {cartItems.map((item, id) => (
        <Fragment key={item.id}>
          <ListItem sx={{ marginBottom: { xs: '30px', sm: 0 }, padding: 0 }}>
            <CartListItem
              cartItem={item}
              handleDelete={() => handleDelete(item.id)}
            />
          </ListItem>
          {id !== cartItems.length - 1 && (
            <Box
              sx={{ display: { xs: 'none', sm: 'block' } }}
              bgcolor={'#EAECF0'}
              width={'100%'}
              marginY={'60px'}
              height={'1px'}
            ></Box>
          )}
        </Fragment>
      ))}
    </List>
  );
}
