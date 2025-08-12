import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ProfilePage from '@/app/(main)/(protected)/profile/page';
import SessionProvider from '../../../../SessionProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('ProfilePage', () => {
  it('renders heading only', () => {
    render(
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <ProfilePage />
        </QueryClientProvider>
      </SessionProvider>,
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
