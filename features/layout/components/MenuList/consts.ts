import {
  LogoutIcon,
  MyProductsIcon,
  MyWishlistIcon,
  OrderHistoryIcon,
  RecentlyViewedIcon,
  SettingsIcon,
} from '@/shared/icons';
import type { MenuItem } from './interface';

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
    label: 'Sign out',
    icon: LogoutIcon,
    href: '/sign-out',
  },
];
