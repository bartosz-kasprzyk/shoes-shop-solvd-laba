import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as profileClient from '../../client/profile.api';
import * as profileService from '../../services/profile.service';
import useUser from '../../../../shared/hooks/useUser';
import useProfile from '../useProfile';

jest.mock('../../client/profile.api');
jest.mock('../../services/profile.service');
jest.mock('../../../../shared/hooks/useUser');

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useProfile', () => {
  const session = {
    user: { id: 123, accessToken: 'token-123' },
  };

  const validProfile = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phoneNumber: '1234567890',
    avatar: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches profile when session is authenticated', async () => {
    (useUser as jest.Mock).mockReturnValue({
      session,
      status: 'authenticated',
    });

    (profileClient.getProfile as jest.Mock).mockResolvedValue({
      id: 123,
      firstName: 'Test',
    });

    const { result } = renderHook(() => useProfile(), { wrapper });

    await waitFor(() => !result.current.profile.isLoading);

    expect(profileClient.getProfile).toHaveBeenCalledWith('token-123');
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('calls handleProfileUpdate and invalidates queries on success', async () => {
    (useUser as jest.Mock).mockReturnValue({
      session,
      status: 'authenticated',
    });

    const mockUpdatedProfile = { id: 123, firstName: 'Updated' };

    (profileService.handleProfileUpdate as jest.Mock).mockResolvedValue(
      mockUpdatedProfile,
    );
    jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useProfile(), { wrapper });

    act(() => {
      result.current.onSubmit({
        profile: validProfile,
        avatarOperation: 'none',
        avatarFile: undefined,
      });
    });

    await waitFor(() => !result.current.isSubmitting);

    expect(profileService.handleProfileUpdate).toHaveBeenCalledWith({
      profile: validProfile,
      avatarOperation: 'none',
      avatarFile: undefined,
      id: 123,
      token: 'token-123',
    });

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['profile'],
    });
  });

  it('does not call mutation if session not ready', () => {
    (useUser as jest.Mock).mockReturnValue({
      session: null,
      status: 'loading',
    });

    const { result } = renderHook(() => useProfile(), { wrapper });

    act(() => {
      result.current.onSubmit({
        profile: validProfile,
        avatarOperation: 'none',
        avatarFile: undefined,
      });
    });

    expect(profileService.handleProfileUpdate).not.toHaveBeenCalled();
  });
});
