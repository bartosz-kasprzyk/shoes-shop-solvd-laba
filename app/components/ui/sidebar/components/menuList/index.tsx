'use client';

import { Box, List } from '@mui/material';
import { usePathname } from 'next/navigation';
import MenuItem from './components/menuItem';
import { menuItems } from './consts';

export default function MenuList() {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        flexGrow: 1,
        px: 2,
        py: 1,
      }}
    >
      <List disablePadding>
        {menuItems.map((item) => {
          const isActive = pathname.includes(item.href);
          return <MenuItem key={item.href} item={item} isActive={isActive} />;
        })}
      </List>
    </Box>
  );
}
