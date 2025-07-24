'use client';

import { List } from '@mui/material';
import { usePathname } from 'next/navigation';
import MenuItem from './components/menuItem';
import { menuItems } from './consts';

export default function MenuList() {
  const pathname = usePathname();

  return (
    <div className='flex-1 px-4 py-2'>
      <List disablePadding>
        {menuItems.map((item) => {
          const isActive = pathname.includes(item.href);
          return <MenuItem key={item.href} item={item} isActive={isActive} />;
        })}
      </List>
    </div>
  );
}
