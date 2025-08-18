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

describe('useSignOut', () => {
  const mockShowSnackbar = jest.fn();
  const mockSignOut = signOut as jest.MockedFunction<typeof signOut>;
  const mockUseSnackbar = useSnackbar as jest.MockedFunction<
    typeof useSnackbar
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSnackbar.mockReturnValue({
      showSnackbar: mockShowSnackbar,
    });
  });

  it('should call signOut with correct callbackUrl when sign out succeeds', async () => {
    mockSignOut.mockResolvedValue(undefined);

    const { result } = renderHook(() => useSignOut());

    await result.current.handleSignOut();

    expect(mockSignOut).toHaveBeenCalledWith({
      callbackUrl: '/?signedOut=true',
    });
    expect(mockShowSnackbar).not.toHaveBeenCalled();
  });

  it('should show error snackbar when sign out fails', async () => {
    const error = new Error('Sign out failed');
    mockSignOut.mockRejectedValue(error);

    const { result } = renderHook(() => useSignOut());

    await result.current.handleSignOut();

    expect(mockSignOut).toHaveBeenCalledWith({
      callbackUrl: '/?signedOut=true',
    });
    expect(mockShowSnackbar).toHaveBeenCalledWith(
      'Error signing out. Please try again.',
      'error',
    );
  });
});
