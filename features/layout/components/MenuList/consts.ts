import {
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
    label: 'My wishlist',
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
];
