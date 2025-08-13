'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import type { UserProfile } from '../TopBar/interface';

interface TopBarMenuProps {
  user: UserProfile | null;
}

export default function TopBarMenu({ user }: TopBarMenuProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>{isMobile ? <MobileMenu user={user} /> : <DesktopMenu user={user} />}</>
  );
}
