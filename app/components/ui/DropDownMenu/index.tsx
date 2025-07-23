'use client';

import { Menu, MenuItem, IconButton } from '@mui/material';
import moreIcon from './icons/dropdown-button.svg';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import Image from 'next/image';

export default function DropDownMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    console.log(`${action} clicked`);
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label='more icon'
        sx={{
          position: 'absolute',
          top: 14,
          right: 14,
          borderRadius: '20%',
        }}
        onClick={handleClick}
      >
        <Image
          src={moreIcon}
          title='drop down icon'
          alt='drop down icon'
          width={20}
          height={5}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            mt: '10px',
            borderRadius: '8px',
          },
          '& .MuiMenuItem-root': {
            fontWeight: 300,
          },
        }}
        disableScrollLock
      >
        <MenuItem onClick={() => handleAction('View')}>View</MenuItem>
        <MenuItem onClick={() => handleAction('Edit')}>Edit</MenuItem>
        <MenuItem onClick={() => handleAction('Duplicate')}>Duplicate</MenuItem>
        <MenuItem onClick={() => handleAction('Delete')}>Delete</MenuItem>
      </Menu>
    </>
  );
}
