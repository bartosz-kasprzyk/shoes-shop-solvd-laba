import { render, screen, act, waitFor } from '@testing-library/react';
import { CartProvider } from '../CartProvider';
import {
  CartContext,
  type CartContextType,
} from '@/shared/contexts/CartContext';
import useUser from '@/shared/hooks/useUser';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

jest.mock('@/shared/hooks/useUser', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('CartProvider', () => {
  const mockUseUser = useUser as jest.Mock;

  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  const renderWithConsumer = (
    callback: (value: CartContextType) => React.ReactNode,
  ) =>
    render(
      <CartProvider>
        <CartContext.Consumer>
          {(value) => {
            if (!value) throw new Error('CartContext value is undefined');
            return callback(value);
          }}
        </CartContext.Consumer>
      </CartProvider>,
    );

  it('initializes cart for guest user', () => {
    mockUseUser.mockReturnValue({ session: null });
    localStorageMock.getItem.mockReturnValueOnce(null);

    localStorageMock.setItem.mockImplementation((key, value) => {
      if (key === 'cart_guest') {
        const storedValue = JSON.parse(value);
        expect(storedValue.cartId).toBeDefined();
      }
    });

    renderWithConsumer((value) => (
      <span data-testid='cart-id'>{value.cartId}</span>
    ));

    const cartId = screen.getByTestId('cart-id').textContent;
    expect(cartId).toBeTruthy();
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cart_guest',
      expect.stringContaining(`"cartId":"${cartId}"`),
    );
  });

  it('initializes cart with stored items', () => {
    const storedCart = {
      cartId: 'cart_1234',
      cart: [{ productId: 'p1', size: '33', quantity: 2 }],
    };
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(storedCart));
    mockUseUser.mockReturnValue({ session: null });

    renderWithConsumer((value) => (
      <>
        <span data-testid='cart-id'>{value.cartId}</span>
        <span data-testid='cart-length'>{value.cart.length}</span>
      </>
    ));

    expect(screen.getByTestId('cart-id').textContent).toBe('cart_1234');
    expect(screen.getByTestId('cart-length').textContent).toBe('1');
  });

  it('adds item to cart', async () => {
    mockUseUser.mockReturnValue({ session: null });
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify({ cartId: 'test-id', cart: [] }),
    );

    renderWithConsumer((value) => (
      <>
        <button
          onClick={() =>
            value.addItem({ productId: 'p1', size: '36', quantity: 2 })
          }
        >
          Add Item
        </button>
        <span data-testid='cart-length'>{value.cart.length}</span>
      </>
    ));

    act(() => {
      screen.getByRole('button', { name: /add item/i }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('1');
    });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('updates quantity of existing item', async () => {
    mockUseUser.mockReturnValue({ session: null });
    const initialCart = {
      cartId: 'test-id',
      cart: [{ productId: 'p1', size: '36', quantity: 2 }],
    };
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(initialCart));

    renderWithConsumer((value) => (
      <>
        <button onClick={() => value.updateQuantity('p1', '36', 5)}>
          Update
        </button>
        <span data-testid='quantity'>{value.cart[0]?.quantity}</span>
      </>
    ));

    expect(screen.getByTestId('quantity').textContent).toBe('2');

    act(() => {
      screen.getByRole('button', { name: /update/i }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('quantity').textContent).toBe('5');
    });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('removes item when quantity is set to 0', async () => {
    mockUseUser.mockReturnValue({ session: null });
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify({
        cartId: 'test-id',
        cart: [{ productId: 'p1', size: '36', quantity: 2 }],
      }),
    );

    renderWithConsumer((value) => (
      <>
        <button onClick={() => value.updateQuantity('p1', '36', 0)}>
          Update
        </button>
        <span data-testid='cart-length'>{value.cart.length}</span>
      </>
    ));

    act(() => {
      screen.getByRole('button', { name: /update/i }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('0');
    });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('deletes item by id and size', async () => {
    mockUseUser.mockReturnValue({ session: null });
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify({
        cartId: 'test-id',
        cart: [
          { productId: 'p1', size: '36', quantity: 2 },
          { productId: 'p2', size: '37', quantity: 1 },
        ],
      }),
    );

    renderWithConsumer((value) => (
      <>
        <button onClick={() => value.deleteItem('p1', '36')}>Delete</button>
        <span data-testid='cart-length'>{value.cart.length}</span>
      </>
    ));

    act(() => {
      screen.getByRole('button', { name: /delete/i }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('1');
    });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('deletes item by product id', async () => {
    mockUseUser.mockReturnValue({ session: null });
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify({
        cartId: 'test-id',
        cart: [
          { productId: 'p1', size: '36', quantity: 2 },
          { productId: 'p2', size: '37', quantity: 1 },
        ],
      }),
    );

    renderWithConsumer((value) => (
      <>
        <button onClick={() => value.deleteItemById('p1')}>Delete By ID</button>
        <span data-testid='cart-length'>{value.cart.length}</span>
      </>
    ));

    act(() => {
      screen.getByRole('button', { name: /delete by id/i }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('1');
    });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('clears the cart', async () => {
    mockUseUser.mockReturnValue({ session: null });
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify({
        cartId: 'test-id',
        cart: [{ productId: 'p1', size: '36', quantity: 2 }],
      }),
    );

    renderWithConsumer((value) => (
      <>
        <button onClick={() => value.clearCart()}>Clear Cart</button>
        <span data-testid='cart-length'>{value.cart.length}</span>
      </>
    ));

    act(() => {
      screen.getByRole('button', { name: /clear cart/i }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('0');
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('cart_guest');
  });

  it('increments quantity if item already exists', async () => {
    mockUseUser.mockReturnValue({ session: null });
    const initialCart = {
      cartId: 'test-id',
      cart: [{ productId: 'p1', size: '36', quantity: 2 }],
    };
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(initialCart));

    renderWithConsumer((value) => (
      <>
        <button
          onClick={() =>
            value.addItem({ productId: 'p1', size: '36', quantity: 3 })
          }
        >
          Add Existing
        </button>
        <span data-testid='quantity'>{value.cart[0]?.quantity}</span>
      </>
    ));

    act(() => {
      screen.getByRole('button', { name: /add existing/i }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('quantity').textContent).toBe('5');
    });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('updates quantity of an existing item without removing it', async () => {
    mockUseUser.mockReturnValue({ session: null });
    const initialCart = {
      cartId: 'test-id',
      cart: [{ productId: 'p1', size: '36', quantity: 2 }],
    };
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(initialCart));

    renderWithConsumer((value) => (
      <>
        <button onClick={() => value.updateQuantity('p1', '36', 4)}>
          Update Existing
        </button>
        <span data-testid='quantity'>{value.cart[0]?.quantity}</span>
      </>
    ));

    act(() => {
      screen.getByRole('button', { name: /update existing/i }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('quantity').textContent).toBe('4');
    });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
});
