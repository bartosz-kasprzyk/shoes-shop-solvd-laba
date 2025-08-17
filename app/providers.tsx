'use client';

import QueryProvider from '@/shared/providers/QueryProvider';
import { SnackbarProvider } from '@/shared/providers/SnackbarProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import theme from './theme';

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <QueryProvider>
            <SnackbarProvider>{children}</SnackbarProvider>
          </QueryProvider>
        </SessionProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
