import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuItem from '..';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const DummyIcon = ({ color }: { color?: string }) => (
  <svg data-testid='icon' fill={color || 'none'} />
);

const theme = createTheme({
  palette: {
    primary: { main: '#FE645E' },
    primaryGrey: { main: '#6e7378' },
  },
});

const mockItem = {
  href: '/test-path',
  label: 'Test Label',
  icon: DummyIcon,
};

describe('MenuItem', () => {
  it('renders the label and link with correct href', () => {
    render(
      <ThemeProvider theme={theme}>
        <MenuItem item={mockItem} isActive={false} />
      </ThemeProvider>,
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockItem.href);
  });

  it('passes correct color to icon when inactive', () => {
    render(
      <ThemeProvider theme={theme}>
        <MenuItem item={mockItem} isActive={false} />
      </ThemeProvider>,
    );

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('fill', '#6e7378');
  });

  it('passes correct color to icon when active', () => {
    render(
      <ThemeProvider theme={theme}>
        <MenuItem item={mockItem} isActive={true} />
      </ThemeProvider>,
    );

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('fill', '#FE645E');
  });
});
