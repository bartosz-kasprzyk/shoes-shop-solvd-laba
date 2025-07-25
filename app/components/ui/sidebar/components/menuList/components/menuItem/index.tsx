import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import type { MenuItemProps } from './interface';

export default function MenuItem({ item, isActive }: MenuItemProps) {
  const iconColor = isActive ? '#FE645E' : '#6e7378';

  return (
    <Link href={item.href}>
      <ListItem disablePadding>
        <ListItemButton
          className='rounded-lg'
          sx={{
            py: 1.5,
            px: 2,
            mb: 0.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
            }}
          >
            <item.icon color={iconColor} />
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            sx={{
              '& .MuiListItemText-primary': {
                fontSize: '0.875rem',
                fontWeight: 500,
                color: isActive ? '#FE645E' : '#000',
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}
