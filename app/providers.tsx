'use client';

import QueryProvider from '@/shared/providers/QueryProvider';
import { SnackbarProvider } from '@/shared/providers/SnackbarProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import theme from './theme';
import { CartProvider } from '@/shared/providers/CartProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <QueryProvider>
            <SnackbarProvider>
              <CartProvider>{children}</CartProvider>
            </SnackbarProvider>
          </QueryProvider>
        </SessionProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
