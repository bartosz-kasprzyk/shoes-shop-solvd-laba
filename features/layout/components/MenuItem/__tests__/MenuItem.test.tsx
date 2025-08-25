import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

const handleClick = jest.fn();

const mockItemWithOnClick = {
  label: 'Clickable Label',
  icon: DummyIcon,
  onClick: handleClick,
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

    const label = screen.getByText('Test Label');
    expect(label).toHaveStyle('color: #000');
  });

  it('passes correct color to icon when active', () => {
    render(
      <ThemeProvider theme={theme}>
        <MenuItem item={mockItem} isActive={true} />
      </ThemeProvider>,
    );

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('fill', '#FE645E');

    const label = screen.getByText('Test Label');
    expect(label).toHaveStyle('color: #FE645E');
  });

  it('renders as a button and calls onClick when clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <MenuItem item={mockItemWithOnClick} isActive={false} />
      </ThemeProvider>,
    );

    expect(screen.getByText('Clickable Label')).toBeInTheDocument();

    expect(screen.queryByRole('link')).not.toBeInTheDocument();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders onClick variant with active colors for icon and label', () => {
    render(
      <ThemeProvider theme={theme}>
        <MenuItem item={mockItemWithOnClick} isActive={true} />
      </ThemeProvider>,
    );

    const label = screen.getByText('Clickable Label');
    expect(label).toHaveStyle('color: #FE645E');

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('fill', '#FE645E');
  });

  it("renders a link with href='#' when item.href is not provided", () => {
    const mockItemWithoutHref = {
      label: 'No Href Label',
      icon: DummyIcon,
    };

    render(
      <ThemeProvider theme={theme}>
        <MenuItem item={mockItemWithoutHref} isActive={false} />
      </ThemeProvider>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#');
  });
});
