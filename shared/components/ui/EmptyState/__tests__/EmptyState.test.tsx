import { render, screen } from '@testing-library/react';
import EmptyState from '..';

jest.mock('next/link', () => {
  const Link = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  return Link;
});

jest.mock('@/shared/icons', () => {
  const BagIcon = () => <svg data-testid='bag-icon' />;
  return { BagIcon };
});

describe('EmptyState Component', () => {
  const defaultProps = {
    title: 'Your Cart is Empty',
    description:
      'Looks like you haven’t added anything to your cart yet. Go ahead and explore our products!',
    buttonText: 'Shop Now',
    buttonHref: '/products',
  };

  it('renders correctly with default icon', () => {
    render(<EmptyState {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: defaultProps.buttonText }),
    ).toBeInTheDocument();

    const linkElement = screen.getByRole('link', {
      name: defaultProps.buttonText,
    });
    expect(linkElement).toHaveAttribute('href', defaultProps.buttonHref);

    expect(screen.getByTestId('bag-icon')).toBeInTheDocument();
  });

  it('renders with a custom icon', () => {
    const CustomIcon = () => <span data-testid='custom-icon'>Custom</span>;
    render(<EmptyState {...defaultProps} icon={<CustomIcon />} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('bag-icon')).not.toBeInTheDocument();
  });

  it('applies correct accessibility attributes to the button link', () => {
    render(<EmptyState {...defaultProps} />);
    const linkElement = screen.getByRole('link', {
      name: defaultProps.buttonText,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.querySelector('button')).toBeInTheDocument();
  });
});
