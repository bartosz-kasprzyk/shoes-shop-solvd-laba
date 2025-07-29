import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import type { MenuItemProps } from './interface';
import Link from 'next/link';

export default function MenuItem({ item, isActive }: MenuItemProps) {
  const theme = useTheme();
  const iconColor = isActive
    ? theme.palette.primary.main
    : theme.palette.primaryGrey.main;

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        href={item.href}
        sx={{
          py: 1.5,
          px: 2,
          mb: 0.5,
          borderRadius: 2,
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <item.icon color={iconColor} />
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          sx={{
            '& .MuiListItemText-primary': {
              fontSize: '0.875rem',
              fontWeight: 500,
              color: isActive ? theme.palette.primary.main : '#000',
              textDecoration: 'none',
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
