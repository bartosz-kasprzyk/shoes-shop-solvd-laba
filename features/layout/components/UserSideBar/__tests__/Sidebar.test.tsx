import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('../../MenuItem', () => ({
  __esModule: true,
  default: (props: MenuItemProps) => (
    <div
      data-testid='menu-item'
      data-active={props.isActive ? 'true' : 'false'}
    >
      {props.item.label}
    </div>
  ),
}));

jest.mock('../../MenuList/consts', () => ({
  menuItems: [
    { href: '/home', label: 'Home', icon: () => <div>Icon</div> },
    { href: '/about', label: 'About', icon: () => <div>Icon</div> },
    { href: '/contact', label: 'Contact', icon: () => <div>Icon</div> },
  ],
}));

jest.mock('../../MenuList/useSignOut', () => ({
  useSignOut: () => ({
    handleSignOut: jest.fn(),
  }),
}));

jest.mock('@/shared/icons', () => ({
  LogoutIcon: () => <div>Icon</div>,
}));

import { usePathname } from 'next/navigation';
import MenuList from '../../MenuList';
import type { MenuItemProps } from '../../MenuItem/interface';

describe('MenuList', () => {
  it('renders menu items with correct active state based on pathname', () => {
    (usePathname as jest.Mock).mockReturnValue('/about/team');

    render(<MenuList />);

    const items = screen.getAllByTestId('menu-item');

    expect(items).toHaveLength(4); // 3 menu items + 1 sign out item

    expect(items[0]).toHaveAttribute('data-active', 'false');
    expect(items[1]).toHaveAttribute('data-active', 'true');
    expect(items[2]).toHaveAttribute('data-active', 'false');
    expect(items[3]).toHaveAttribute('data-active', 'false'); // signOutItem
  });
});
