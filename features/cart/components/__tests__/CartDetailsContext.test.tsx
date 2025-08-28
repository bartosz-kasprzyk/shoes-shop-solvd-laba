import { render, screen, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchProductById } from '@/features/products/components/ProductDetails/api/productApi';
import { useCart } from '@/shared/hooks/useCart';
import { useCartDetails, CartDetailsProvider } from '../CartDetailsContext';

jest.mock('@/shared/hooks/useCart');
jest.mock('@/features/products/components/ProductDetails/api/productApi');

describe('CartDetailsProvider', () => {
  const mockUseCart = useCart as jest.Mock;
  const mockFetchProductById = fetchProductById as jest.Mock;
  const queryClient = new QueryClient();

  const TestConsumer = ({
    children,
  }: {
    children: (value: ReturnType<typeof useCartDetails>) => React.ReactNode;
  }) => {
    const value = useCartDetails();
    return <>{children(value)}</>;
  };

  const renderWithProvider = (
    callback: (value: ReturnType<typeof useCartDetails>) => React.ReactNode,
  ) =>
    render(
      <QueryClientProvider client={queryClient}>
        <CartDetailsProvider>
          <TestConsumer>{callback}</TestConsumer>
        </CartDetailsProvider>
      </QueryClientProvider>,
    );

  beforeEach(() => {
    queryClient.clear();
  });

  it('provides empty cart details when cart is empty', () => {
    mockUseCart.mockReturnValue({
      cart: [],
      updateQuantity: jest.fn(),
      deleteItem: jest.fn(),
      deleteItemById: jest.fn(),
    });

    renderWithProvider((value) => (
      <span data-testid='cart-length'>{value.cartItems.length}</span>
    ));

    expect(screen.getByTestId('cart-length').textContent).toBe('0');
  });

  it('maps cart items with fetched products', async () => {
    mockUseCart.mockReturnValue({
      cart: [{ productId: '1', size: '42', quantity: 2 }],
      updateQuantity: jest.fn(),
      deleteItem: jest.fn(),
      deleteItemById: jest.fn(),
    });

    mockFetchProductById.mockResolvedValueOnce({
      data: {
        id: 1,
        attributes: {
          name: 'Sneaker',
          price: 120,
          gender: { data: { attributes: { name: 'Men' } } },
          images: { data: [{ attributes: { url: '/shoe.jpg' } }] },
        },
      },
    });

    renderWithProvider((value) => (
      <>
        <span data-testid='cart-length'>{value.cartItems.length}</span>
      </>
    ));

    await waitFor(() => {
      expect(screen.getByTestId('cart-length').textContent).toBe('1');
    });

    expect(mockFetchProductById).toHaveBeenCalledWith('1');
  });

  it('removes items if product fetch fails', async () => {
    const deleteItemById = jest.fn();
    mockUseCart.mockReturnValue({
      cart: [{ productId: '999', size: '42', quantity: 1 }],
      updateQuantity: jest.fn(),
      deleteItem: jest.fn(),
      deleteItemById,
    });

    mockFetchProductById.mockRejectedValue(new Error('Not found'));
    renderWithProvider((value) => (
      <span data-testid='cart-length'>{value.cartItems.length}</span>
    ));

    await waitFor(
      () => {
        expect(deleteItemById).toHaveBeenCalledWith('999');
      },
      {
        timeout: 2000,
      },
    );

    expect(screen.getByTestId('cart-length').textContent).toBe('0');
  });

  it('exposes updateQuantity and deleteItem through context', () => {
    const updateQuantity = jest.fn();
    const deleteItem = jest.fn();
    mockUseCart.mockReturnValue({
      cart: [],
      updateQuantity,
      deleteItem,
      deleteItemById: jest.fn(),
    });

    renderWithProvider((value) => (
      <>
        <button onClick={() => value.handleQuantityChange('1', '42', 3)}>
          Update
        </button>
        <button onClick={() => value.handleDeleteItem('1', '42')}>
          Delete
        </button>
      </>
    ));

    act(() => {
      screen.getByText('Update').click();
      screen.getByText('Delete').click();
    });

    expect(updateQuantity).toHaveBeenCalledWith('1', '42', 3);
    expect(deleteItem).toHaveBeenCalledWith('1', '42');
  });

  it('calls refetchAllProducts when invoked', async () => {
    mockUseCart.mockReturnValue({
      cart: [{ productId: '1', size: '42', quantity: 2 }],
      updateQuantity: jest.fn(),
      deleteItem: jest.fn(),
      deleteItemById: jest.fn(),
    });

    const refetchSpy = jest.fn().mockResolvedValue({
      data: {
        id: 1,
        attributes: {
          name: 'Sneaker',
          price: 100,
          gender: { data: { attributes: { name: 'Men' } } },
          images: { data: [] },
        },
      },
    });

    (fetchProductById as jest.Mock).mockImplementation(refetchSpy);

    renderWithProvider((value) => (
      <button onClick={() => value.refetchAllProducts()}>Refetch</button>
    ));

    act(() => {
      screen.getByText('Refetch').click();
    });

    await waitFor(() => {
      expect(refetchSpy).toHaveBeenCalled();
    });
  });

  it('falls back to default image when no product image is available', async () => {
    mockUseCart.mockReturnValue({
      cart: [{ productId: '2', size: '40', quantity: 1 }],
      updateQuantity: jest.fn(),
      deleteItem: jest.fn(),
      deleteItemById: jest.fn(),
    });

    mockFetchProductById.mockResolvedValueOnce({
      data: {
        id: 2,
        attributes: {
          name: 'Boot',
          price: 80,
          gender: { data: { attributes: { name: 'Women' } } },
          images: { data: [] },
        },
      },
    });

    renderWithProvider((value) => (
      <span data-testid='img-src'>{value.cartItems[0]?.img.src}</span>
    ));

    await waitFor(() => {
      expect(screen.getByTestId('img-src').textContent).toBe(
        '/shoe-welcome.png',
      );
    });
  });
});
