import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import MenuList from '..';
import { useSignOut } from '../useSignOut';

const theme = createTheme({
  palette: {
    primary: { main: '#FE645E' },
    primaryGrey: { main: '#6e7378' },
  },
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('../useSignOut', () => ({
  useSignOut: jest.fn(),
}));

jest.mock('../consts', () => {
  const DummyIcon = () => <svg data-testid='icon' />;
  return {
    menuItems: [
      { label: 'My products', href: '/my-products', icon: DummyIcon },
      { label: 'Sign out', icon: DummyIcon },
    ],
  };
});

describe('MenuList', () => {
  const mockedUsePathname = usePathname as jest.Mock;

  beforeEach(() => {
    (useSignOut as jest.Mock).mockReturnValue({ handleSignOut: jest.fn() });
  });

  it('covers "truthy" branch when item.href exists and pathname matches', () => {
    mockedUsePathname.mockReturnValue('/my-products');

    render(
      <ThemeProvider theme={theme}>
        <MenuList />
      </ThemeProvider>,
    );

    const activeItem = screen.getByText('My products');
    expect(activeItem).toHaveStyle('color: #FE645E');
  });

  it('covers "falsy" branch when item.href is missing', () => {
    mockedUsePathname.mockReturnValue('/some-other-path');

    render(
      <ThemeProvider theme={theme}>
        <MenuList />
      </ThemeProvider>,
    );

    const inactiveItems = screen.getAllByText('Sign out');
    expect(inactiveItems).toHaveLength(2);
    expect(inactiveItems[0]).not.toHaveStyle('color: #FE645E');
    expect(inactiveItems[1]).not.toHaveStyle('color: #FE645E');
  });
});
