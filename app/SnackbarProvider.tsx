'use client';

import {
  SnackbarProvider as NotistackProvider,
  enqueueSnackbar,
} from 'notistack';
import type {
  SnackbarContextType} from '@/shared/contexts/SnackbarContext';
import {
  SnackbarContext
} from '@/shared/contexts/SnackbarContext';
import type { ReactNode } from 'react';

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const showSnackbar: SnackbarContextType['showSnackbar'] = (
    message,
    severity = 'info',
    duration = 3000,
  ) => {
    enqueueSnackbar(message, {
      variant: severity,
      autoHideDuration: duration,
    });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <NotistackProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {children}
      </NotistackProvider>
    </SnackbarContext.Provider>
  );
}
