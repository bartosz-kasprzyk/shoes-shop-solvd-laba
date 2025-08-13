'use client';

import { Box, List } from '@mui/material';
import { usePathname } from 'next/navigation';
import MenuItem from '../MenuItem';
import { menuItems, signOutItem } from './consts';

export default function MenuList() {
  const pathname = usePathname();

  return (
    <Box>
      <List disablePadding sx={{ paddingLeft: '16px' }}>
        {menuItems.map((item) => {
          return (
            <MenuItem
              key={item.href || item.label}
              item={item}
              isActive={item.href ? pathname.includes(item.href) : false}
            />
          );
        })}
        <MenuItem
          item={signOutItem}
          isActive={
            signOutItem.href ? pathname.includes(signOutItem.href) : false
          }
        />
      </List>
    </Box>
  );
}
