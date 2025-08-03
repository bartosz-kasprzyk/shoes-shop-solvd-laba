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
          const isActive = pathname.includes(item.href);
          return <MenuItem key={item.href} item={item} isActive={isActive} />;
        })}
      </List>
    </Box>
  );
}
