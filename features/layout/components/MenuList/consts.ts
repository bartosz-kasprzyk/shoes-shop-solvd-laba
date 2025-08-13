import {
  LogoutIcon,
  MyProductsIcon,
  MyWishlistIcon,
  OrderHistoryIcon,
  RecentlyViewedIcon,
  SettingsIcon,
} from '@/shared/icons';
import type { MenuItem } from './interface';
import { signOut } from 'next-auth/react';

export const menuItems: MenuItem[] = [
  {
    label: 'My products',
    icon: MyProductsIcon,
    href: '/my-products',
  },
  {
    label: 'Order history',
    icon: OrderHistoryIcon,
    href: '/order-history',
  },
  {
    label: 'My Wishlist',
    icon: MyWishlistIcon,
    href: '/my-wishlist',
  },
  {
    label: 'Recently viewed',
    icon: RecentlyViewedIcon,
    href: '/recently-viewed',
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    href: '/settings',
  },
  {
    label: 'Sign in',
    icon: SettingsIcon,
    href: '/sign-in',
  },
];

export const signOutItem: MenuItem = {
  label: 'Sign out',
  icon: LogoutIcon,
  onClick: () => signOut({ callbackUrl: '/' }),
};
