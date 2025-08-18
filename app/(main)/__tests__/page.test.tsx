import React from 'react';
import { render } from '@testing-library/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
import HomePage from '../page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock useSnackbar hook
jest.mock('@/shared/hooks/useSnackbar', () => ({
  useSnackbar: jest.fn(),
}));

describe('HomePage', () => {
  const mockShowSnackbar = jest.fn();
  const mockReplace = jest.fn();
  const mockGet = jest.fn();
  const mockUseSnackbar = useSnackbar as jest.MockedFunction<
    typeof useSnackbar
  >;
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockUseSearchParams = useSearchParams as jest.MockedFunction<
    typeof useSearchParams
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSnackbar.mockReturnValue({
      showSnackbar: mockShowSnackbar,
    });
    (mockUseRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
    (mockUseSearchParams as jest.Mock).mockReturnValue({
      get: mockGet,
    });
  });

  it('should show snackbar and clean URL when signedOut=true parameter is present', () => {
    mockGet.mockReturnValue('true');

    render(<HomePage />);

    expect(mockGet).toHaveBeenCalledWith('signedOut');
    expect(mockShowSnackbar).toHaveBeenCalledWith(
      'You have been signed out successfully',
      'success',
    );
    expect(mockReplace).toHaveBeenCalledWith('/');
  });

  it('should not show snackbar when signedOut parameter is not present', () => {
    mockGet.mockReturnValue(null);

    render(<HomePage />);

    expect(mockGet).toHaveBeenCalledWith('signedOut');
    expect(mockShowSnackbar).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('should not show snackbar when signedOut parameter is false', () => {
    mockGet.mockReturnValue('false');

    render(<HomePage />);

    expect(mockGet).toHaveBeenCalledWith('signedOut');
    expect(mockShowSnackbar).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
