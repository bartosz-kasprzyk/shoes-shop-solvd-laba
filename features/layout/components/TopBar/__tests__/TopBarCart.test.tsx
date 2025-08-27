import { render, screen } from '@testing-library/react';
import { useCart } from '@/shared/hooks/useCart';
import '@testing-library/jest-dom';
import type { Session } from 'next-auth';
import TopBarCart from '../TopBarCart';

const sessionData: Session = {
  user: {
    id: 1,
    name: 'Alice Johnson',
    image: 'https://example.com/avatar.jpg',
    email: 'alice@example.com',
    accessToken: 'token123',
  },
  expires: '2025-12-31',
};

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: sessionData,
    status: 'authenticated',
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock('@/shared/hooks/useCart');

jest.mock('@/shared/icons', () => ({
  __esModule: true,
  CartLogoIcon: () => <svg data-testid='cart-logo-icon' />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe('TopBarCart', () => {
  it('renders the cart link', () => {
    (useCart as jest.Mock).mockReturnValue({ totalItems: 0 });
    render(<TopBarCart />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/checkout/cart');
  });

  it('renders the cart icon', () => {
    (useCart as jest.Mock).mockReturnValue({ totalItems: 0 });
    render(<TopBarCart />);

    expect(screen.getByTestId('cart-logo-icon')).toBeInTheDocument();
  });

  it('displays the totalItems badge', () => {
    (useCart as jest.Mock).mockReturnValue({ totalItems: 5 });
    render(<TopBarCart />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('hides the badge when totalItems is 0', () => {
    (useCart as jest.Mock).mockReturnValue({ totalItems: 0 });
    render(<TopBarCart />);

    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });
});
