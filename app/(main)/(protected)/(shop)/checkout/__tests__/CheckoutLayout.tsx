import { render, screen, fireEvent } from '@testing-library/react';
import ShopLayout from '../layout';

jest.mock('@/features/cart/components/CartPageEmpty', () => {
  return jest.fn(() => (
    <div data-testid='cart-page-empty-mock'>Cart is Empty</div>
  ));
});

jest.mock('@/features/checkout/stores/checkoutStore', () => ({
  useCheckoutStore: jest.fn(),
}));

jest.mock('@/shared/hooks/useCart', () => ({
  useCart: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
  usePathname: jest.fn(),
}));

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
  useTheme: jest.fn(() => ({
    breakpoints: {
      down: jest.fn((breakpoint) => ({
        md: breakpoint === 'md',
      })),
    },
  })),
}));

jest.mock('@/shared/components/ui', () => ({
  Button: jest.fn(({ children, onClick, disabled, ...props }) => (
    <button onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  )),
}));

describe('ShopLayout', () => {
  /* eslint-disable @typescript-eslint/no-require-imports */
  const mockUseCart = require('@/shared/hooks/useCart').useCart;
  const mockUseCheckoutStore =
    require('@/features/checkout/stores/checkoutStore').useCheckoutStore;
  const mockUseRouter = require('next/navigation').useRouter;
  const mockUsePathname = require('next/navigation').usePathname;
  const mockUseMediaQuery = require('@mui/material').useMediaQuery;
  /* eslint-enable @typescript-eslint/no-require-imports */

  let pushMock: jest.Mock;
  let replaceMock: jest.Mock;
  let backMock: jest.Mock;
  let submitMock: jest.Mock;
  let setLoadingMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    replaceMock = jest.fn();
    backMock = jest.fn();
    submitMock = jest.fn();
    setLoadingMock = jest.fn();

    mockUseCart.mockReturnValue({ totalItems: 1 });
    mockUseCheckoutStore.mockReturnValue({
      submit: submitMock,
      loading: false,
      setLoading: setLoadingMock,
    });
    mockUseRouter.mockReturnValue({
      push: pushMock,
      replace: replaceMock,
      back: backMock,
    });
    mockUsePathname.mockReturnValue('/checkout/cart');
    mockUseMediaQuery.mockReturnValue(false);
  });

  const defaultOrder = <div data-testid='order-content'>Order Details</div>;
  const defaultSummary = (
    <div data-testid='summary-content'>Summary Content</div>
  );

  it('renders CartPageEmpty when totalItems is 0', () => {
    mockUseCart.mockReturnValue({ totalItems: 0 });

    render(<ShopLayout order={defaultOrder} summary={defaultSummary} />);

    expect(screen.getByTestId('cart-page-empty-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('order-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('summary-content')).not.toBeInTheDocument();
  });

  it('renders desktop layout for /checkout/cart on desktop', () => {
    mockUseCart.mockReturnValue({ totalItems: 5 });
    mockUseMediaQuery.mockReturnValue(false);
    mockUsePathname.mockReturnValue('/checkout/cart');

    render(<ShopLayout order={defaultOrder} summary={defaultSummary} />);

    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByTestId('order-content')).toBeInTheDocument();
    expect(screen.getByTestId('summary-content')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to checkout' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Continue Shopping' }),
    ).toBeInTheDocument();
  });

  it('renders desktop layout for /checkout on desktop', () => {
    mockUseCart.mockReturnValue({ totalItems: 5 });
    mockUseMediaQuery.mockReturnValue(false);
    mockUsePathname.mockReturnValue('/checkout');

    render(<ShopLayout order={defaultOrder} summary={defaultSummary} />);

    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByTestId('order-content')).toBeInTheDocument();
    expect(screen.getByTestId('summary-content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pay' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Continue Shopping' }),
    ).not.toBeInTheDocument();
  });

  it('renders mobile layout for /checkout/cart on mobile', () => {
    mockUseCart.mockReturnValue({ totalItems: 2 });
    mockUseMediaQuery.mockReturnValue(true);
    mockUsePathname.mockReturnValue('/checkout/cart');

    render(<ShopLayout order={defaultOrder} summary={defaultSummary} />);

    expect(screen.queryByText('Back')).not.toBeInTheDocument();
    expect(screen.getByTestId('order-content')).toBeInTheDocument();
    expect(screen.queryByTestId('summary-content')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to checkout' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Continue Shopping' }),
    ).toBeInTheDocument();
  });

  it('renders mobile layout for /checkout/summary on mobile', () => {
    mockUseCart.mockReturnValue({ totalItems: 2 });
    mockUseMediaQuery.mockReturnValue(true);
    mockUsePathname.mockReturnValue('/checkout/summary');

    render(<ShopLayout order={defaultOrder} summary={defaultSummary} />);

    expect(screen.queryByText('Back')).not.toBeInTheDocument();
    expect(screen.queryByTestId('order-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('summary-content')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to checkout' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Continue Shopping' }),
    ).toBeInTheDocument();
  });

  it('renders mobile layout for /checkout on mobile', () => {
    mockUseCart.mockReturnValue({ totalItems: 2 });
    mockUseMediaQuery.mockReturnValue(true);
    mockUsePathname.mockReturnValue('/checkout');

    render(<ShopLayout order={defaultOrder} summary={defaultSummary} />);

    expect(screen.queryByText('Back')).not.toBeInTheDocument();
    expect(screen.getByTestId('order-content')).toBeInTheDocument();
    expect(screen.queryByTestId('summary-content')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pay' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Continue Shopping' }),
    ).not.toBeInTheDocument();
  });

  it('handleNavigate navigates to /checkout on desktop from /checkout/cart', () => {
    mockUseCart.mockReturnValue({ totalItems: 1 });
    mockUseMediaQuery.mockReturnValue(false);
    mockUsePathname.mockReturnValue('/checkout/cart');

    render(<ShopLayout order={defaultOrder} summary={defaultSummary} />);
    fireEvent.click(screen.getByRole('button', { name: 'Go to checkout' }));

    expect(pushMock).toHaveBeenCalledWith('/checkout');
    expect(setLoadingMock).not.toHaveBeenCalled();
    expect(submitMock).not.toHaveBeenCalled();
  });

  it('handleNavigate navigates to /checkout/summary on mobile from /checkout/cart', () => {
    mockUseCart.mockReturnValue({ totalItems: 1 });
    mockUseMediaQuery.mockReturnValue(true);
    mockUsePathname.mockReturnValue('/checkout/cart');

    render(<ShopLayout order={defaultOrder} summary={defaultSummary} />);
    fireEvent.click(screen.getByRole('button', { name: 'Go to checkout' }));

    expect(pushMock).toHaveBeenCalledWith('/checkout/summary');
    expect(setLoadingMock).not.toHaveBeenCalled();
    expect(submitMock).not.toHaveBeenCalled();
  });

  it('handleNavigate calls submit on /checkout', () => {
    mockUseCart.mockReturnValue({ totalItems: 1 });
    mockUsePathname.mockReturnValue('/checkout');

    render(<ShopLayout order={defaultOrder} summary={defaultSummary} />);
    fireEvent.click(screen.getByRole('button', { name: 'Pay' }));

    expect(setLoadingMock).toHaveBeenCalledWith(true);
    expect(submitMock).toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('handleNavigate uses router.replace for default case', () => {
    mockUseCart.mockReturnValue({ totalItems: 1 });
    mockUsePathname.mockReturnValue('/some-other-path');

    render(<ShopLayout order={defaultOrder} summary={defaultSummary} />);
    fireEvent.click(screen.getByRole('button', { name: 'Go to checkout' }));

    expect(replaceMock).toHaveBeenCalledWith('/checkout');
    expect(pushMock).not.toHaveBeenCalled();
    expect(setLoadingMock).not.toHaveBeenCalled();
    expect(submitMock).not.toHaveBeenCalled();
  });

  it('Back link calls router.back on desktop', () => {
    mockUseCart.mockReturnValue({ totalItems: 1 });
    mockUseMediaQuery.mockReturnValue(false);
    mockUsePathname.mockReturnValue('/checkout/summary');

    render(<ShopLayout order={defaultOrder} summary={defaultSummary} />);
    fireEvent.click(screen.getByText('Back'));

    expect(backMock).toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('Continue Shopping button navigates to /products', () => {
    mockUseCart.mockReturnValue({ totalItems: 1 });
    mockUsePathname.mockReturnValue('/checkout/cart');

    render(<ShopLayout order={defaultOrder} summary={defaultSummary} />);
    fireEvent.click(screen.getByRole('button', { name: 'Continue Shopping' }));

    expect(pushMock).toHaveBeenCalledWith('/products');
    expect(backMock).not.toHaveBeenCalled();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('main button shows "Loading..." when loading is true', () => {
    mockUseCart.mockReturnValue({ totalItems: 1 });
    mockUseCheckoutStore.mockReturnValue({
      submit: submitMock,
      loading: true,
      setLoading: setLoadingMock,
    });
    mockUsePathname.mockReturnValue('/checkout');

    render(<ShopLayout order={defaultOrder} summary={defaultSummary} />);

    expect(
      screen.getByRole('button', { name: 'Loading...' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Loading...' })).toBeDisabled();
  });
});
