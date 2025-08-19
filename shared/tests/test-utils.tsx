import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

export function renderWithProviders(ui: ReactNode, { session = null } = {}) {
  const queryClient = new QueryClient();

  return render(
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </SessionProvider>,
  );
}
