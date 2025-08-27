import { renderHook } from '@testing-library/react';
import { signOut } from 'next-auth/react';
import { useSignOut } from '../useSignOut';
import { useSnackbar } from '@/shared/hooks/useSnackbar';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

// Mock useSnackbar hook
jest.mock('@/shared/hooks/useSnackbar', () => ({
  useSnackbar: jest.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useSignOut', () => {
  const mockShowSnackbar = jest.fn();
  const mockSignOut = signOut as jest.MockedFunction<typeof signOut>;
  const mockUseSnackbar = useSnackbar as jest.MockedFunction<
    typeof useSnackbar
  >;

  beforeEach(() => {
    mockUseSnackbar.mockReturnValue({
      showSnackbar: mockShowSnackbar,
    });
  });

  it('should store pending snackbar message and call signOut when sign out succeeds', async () => {
    mockSignOut.mockResolvedValue(undefined);

    const { result } = renderHook(() => useSignOut());

    await result.current.handleSignOut();

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'pendingSnackbar',
      JSON.stringify({
        message: 'Successfully signed out',
        severity: 'success',
        duration: 3000,
      }),
    );
    expect(mockSignOut).toHaveBeenCalledWith({
      callbackUrl: '/',
    });
    expect(mockShowSnackbar).not.toHaveBeenCalled();
  });

  it('shows error snackbar when sign out fails', async () => {
    const error = new Error('Sign out failed');
    mockSignOut.mockRejectedValue(error);

    const { result } = renderHook(() => useSignOut());

    await result.current.handleSignOut();

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'pendingSnackbar',
      JSON.stringify({
        message: 'Successfully signed out',
        severity: 'success',
        duration: 3000,
      }),
    );
    expect(mockSignOut).toHaveBeenCalledWith({
      callbackUrl: '/',
    });
    expect(mockShowSnackbar).toHaveBeenCalledWith(
      'Error signing out. Please try again.',
      'error',
    );
  });
});
