'use client';

import { Box, List } from '@mui/material';
import { usePathname } from 'next/navigation';
import MenuItem from '../MenuItem';
import { menuItems } from './consts';

export default function MenuList() {
  const pathname = usePathname();

  return (
    <Box>
      <List disablePadding sx={{ paddingLeft: '16px' }}>
        {menuItems.map((item) => {
          return (
            <MenuItem
              key={item.href}
              item={item}
              isActive={pathname.includes(item.href)}
            />
          );
        })}
      </List>
    </Box>
  );
}
