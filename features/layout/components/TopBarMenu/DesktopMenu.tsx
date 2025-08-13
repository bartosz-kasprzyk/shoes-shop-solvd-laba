'use client';

import { useState } from 'react';
import { Avatar, Box, IconButton, Menu, Tooltip } from '@mui/material';
import MenuList from '../MenuList';
import type { UserProfile } from '../TopBar/interface';
import GuestSideBar from './GuestSideBar';

interface DesktopMenuProps {
  user: UserProfile | null;
}

export default function DesktopMenu({ user }: DesktopMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'block' },
        cursor: 'pointer',
        borderRadius: '50%',
        p: 1,
        minWidth: 'auto',
        transition: 'background-color 0.2s',
        '&:hover': {
          backgroundColor: '#f3f4f6',
        },
      }}
    >
      <Tooltip title='Open User menu'>
        <IconButton sx={{ p: 0 }} onClick={handleClick}>
          <Avatar
            src={user?.avatar || undefined}
            alt={user?.name || 'User'}
            sx={{ width: 24, height: 24, fontSize: '0.75rem' }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              border: '1px solid lightgrey',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                borderTop: '1px solid lightgrey',
                borderLeft: '1px solid lightgrey',
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 6,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user ? <MenuList /> : <GuestSideBar />}
      </Menu>
    </Box>
  );
}
