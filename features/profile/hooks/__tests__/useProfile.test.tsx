import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as profileClient from '../../client/profile.api';
import * as profileService from '../../services/profile.service';
import useProfile from '../useProfile';
import { ServerSessionContext } from '@/shared/contexts/ServerSessionContext';

jest.mock('../../client/profile.api');
jest.mock('../../services/profile.service');

const queryClient = new QueryClient();

const session = {
  user: {
    id: 123,
    accessToken: 'token-123',
  },
  expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
};

const validProfile = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  phoneNumber: '1234567890',
  avatar: null,
};

// wrapper now provides both QueryClientProvider and ServerSessionContext
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ServerSessionContext.Provider value={session}>
      {children}
    </ServerSessionContext.Provider>
  </QueryClientProvider>
);

describe('useProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches profile when session is provided', async () => {
    (profileClient.getProfile as jest.Mock).mockResolvedValue({
      id: 123,
      firstName: 'Test',
    });

    const { result } = renderHook(() => useProfile(), { wrapper });

    await waitFor(() => !result.current.profile.isLoading);

    expect(profileClient.getProfile).toHaveBeenCalledWith('token-123');
  });

  it('calls handleProfileUpdate and invalidates queries on success', async () => {
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
});
