import { fetchAllOptions } from '@/app/api/products';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useAllOptions } from '../useAllOptions';
import { useCart } from '../useCart';
import { useServerSession } from '../useServerSession';
import useUser from '../useUser';
import { CartContext } from '@/shared/contexts/CartContext';
import { ServerSessionContext } from '@/shared/contexts/ServerSessionContext';
import { SnackbarContext } from '@/shared/contexts/SnackbarContext';
import { useSnackbar } from '../useSnackbar';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('@/app/api/products', () => ({
  fetchAllOptions: jest.fn(),
}));

describe('Shared hooks', () => {
  const mockUseQuery = useQuery as jest.Mock;
  const mockUseSession = useSession as jest.Mock;
  const mockFetchAllOptions = fetchAllOptions as jest.Mock;

  const queryClient = new QueryClient();

  describe('useAllOptions', () => {
    it('calls useQuery with correct queryKey and queryFn', () => {
      mockUseQuery.mockReturnValue({
        data: { colors: [], sizes: [] },
        isLoading: false,
        isError: false,
        error: null,
      });

      renderHook(() => useAllOptions(), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ['all-options'],
        queryFn: mockFetchAllOptions,
      });
    });

    it('returns the data from useQuery', () => {
      const mockData = {
        colors: [{ value: '1', label: 'Red' }],
        sizes: [{ value: '2', label: 'M' }],
      };

      mockUseQuery.mockReturnValue({
        data: mockData,
        isLoading: false,
        isError: false,
        error: null,
      });

      const { result } = renderHook(() => useAllOptions(), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      expect(result.current.data).toEqual(mockData);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('useCart', () => {
    it('returns the cart context value when used within CartProvider', () => {
      const mockCartContext = {
        cart: [{ productId: '1', size: '36', quantity: 2 }],
        addItem: jest.fn(),
        updateQuantity: jest.fn(),
        deleteItem: jest.fn(),
        clearCart: jest.fn(),
        totalItems: 1,
      };

      const { result } = renderHook(() => useCart(), {
        wrapper: ({ children }) => (
          <CartContext.Provider value={mockCartContext}>
            {children}
          </CartContext.Provider>
        ),
      });

      expect(result.current).toEqual(mockCartContext);
    });

    it('throws an error when not used within CartProvider', () => {
      const renderHookWithError = () => renderHook(() => useCart());

      expect(renderHookWithError).toThrow(
        'useCart must be used within a CartProvider',
      );
    });
  });

  describe('useServerSession', () => {
    it('returns the server session context value when used within ServerSessionContext', () => {
      const mockSession = {
        user: {
          id: 123,
          accessToken: 'mock-access-token',
          email: 'test@example.com',
          name: 'Test User',
          image: '/',
        },
        expires: '2025-12-31T23:59:59Z',
      };

      const { result } = renderHook(() => useServerSession(), {
        wrapper: ({ children }) => (
          <ServerSessionContext.Provider value={mockSession}>
            {children}
          </ServerSessionContext.Provider>
        ),
      });

      expect(result.current).toEqual(mockSession);
    });

    it('throws an error when not used within ServerSessionContext', () => {
      let caughtError: Error | null = null;

      try {
        renderHook(() => useServerSession());
      } catch (err) {
        caughtError = err as Error;
      }

      expect(caughtError).toEqual(
        new Error(
          'useServerSession should be used within ServerSessionContext',
        ),
      );
    });
  });

  describe('useSnackbar', () => {
    it('returns the snackbar context value when used within SnackbarProvider', () => {
      const mockContext = {
        showSnackbar: jest.fn(),
      };

      const { result } = renderHook(() => useSnackbar(), {
        wrapper: ({ children }) => (
          <SnackbarContext.Provider value={mockContext}>
            {children}
          </SnackbarContext.Provider>
        ),
      });

      expect(result.current).toBe(mockContext);
    });

    it('throws an error when not used within SnackbarProvider', () => {
      const renderHookWithError = () => renderHook(() => useSnackbar());

      expect(renderHookWithError).toThrow(
        'useSnackbar must be used within a SnackbarProvider',
      );
    });
  });

  describe('useUser', () => {
    it('returns loading state when session status is "loading"', () => {
      mockUseSession.mockReturnValue({
        data: null,
        status: 'loading',
      });

      const { result } = renderHook(() => useUser());

      expect(result.current.session).toBeNull();
      expect(result.current.status).toBe('loading');
      expect(result.current.isLoading).toBe(true);
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('returns authenticated state when session status is "authenticated"', () => {
      const mockSessionData = {
        user: { name: 'Test User', email: 'test@example.com' },
        expires: '2025-12-31T23:59:59Z',
      };

      mockUseSession.mockReturnValue({
        data: mockSessionData,
        status: 'authenticated',
      });

      const { result } = renderHook(() => useUser());

      expect(result.current.session).toEqual(mockSessionData);
      expect(result.current.status).toBe('authenticated');
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('returns unauthenticated state when session status is "unauthenticated"', () => {
      mockUseSession.mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });

      const { result } = renderHook(() => useUser());

      expect(result.current.session).toBeNull();
      expect(result.current.status).toBe('unauthenticated');
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
