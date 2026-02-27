import { render, screen } from '@testing-library/react';

import React from 'react';
import EmptyState from '../EmptyState';
import type { CustomButtonProps } from '../Button/interface';

jest.mock('@/shared/components/ui', () => ({
  Button: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    props: CustomButtonProps;
  }) => <button {...props}>{children}</button>,
}));

describe('EmptyState', () => {
  const defaultProps = {
    title: 'No products found',
    description: 'Try adjusting your filters or browse other categories.',
    buttonText: 'Browse Products',
    buttonHref: '/products',
    icon: <div />,
  };

  it('renders title, description and button', () => {
    render(<EmptyState {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: defaultProps.buttonText }),
    ).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    const CustomIcon = () => <div data-testid='custom-icon' />;
    render(<EmptyState {...defaultProps} icon={<CustomIcon />} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('button links to the correct href', () => {
    render(<EmptyState {...defaultProps} />);
    const link = screen.getByRole('link', { name: defaultProps.buttonText });
    expect(link).toHaveAttribute('href', defaultProps.buttonHref);
  });
});
