'use client';

import { Divider } from '@mui/material';
import { UserProfile, MenuList } from './components';
import type { SidebarProps } from './interface';

export default function Sidebar({ user }: SidebarProps) {
  return (
    <div className='h-full w-80 transform bg-white shadow-lg transition-transform duration-300 ease-in-out'>
      <div className='flex h-full flex-col'>
        <UserProfile user={user} />
        <Divider />
        <MenuList />
      </div>
    </div>
  );
}
