'use client';

import { List } from '@mui/material';
import { usePathname } from 'next/navigation';
import MenuItem from '../MenuItem';
import { menuItems } from './consts';
import { ScrollableContainer } from '../ScrollableContainer';
import { useSignOut } from './useSignOut';
import { LogoutIcon } from '@/shared/icons';

export default function MenuList() {
  const pathname = usePathname();
  const { handleSignOut } = useSignOut();

  const signOutItem = {
    label: 'Sign out',
    icon: LogoutIcon,
    onClick: handleSignOut,
  };

  return (
    <ScrollableContainer>
      <List sx={{ px: '8px', pt: '4px' }}>
        {menuItems.map((item) => {
          return (
            <MenuItem
              key={item.href || item.label}
              item={item}
              isActive={item.href ? pathname.includes(item.href) : false}
            />
          );
        })}
        <MenuItem item={signOutItem} isActive={false} />
      </List>
    </ScrollableContainer>
  );
}
