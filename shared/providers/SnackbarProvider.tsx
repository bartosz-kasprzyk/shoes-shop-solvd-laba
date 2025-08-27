'use client';

import {
  SnackbarProvider as NotistackProvider,
  enqueueSnackbar,
} from 'notistack';
import type { SnackbarContextType } from '@/shared/contexts/SnackbarContext';
import { SnackbarContext } from '@/shared/contexts/SnackbarContext';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

const PENDING_SNACKBAR_KEY = 'pendingSnackbar';

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

  useEffect(() => {
    const pendingMessage = localStorage.getItem(PENDING_SNACKBAR_KEY);
    if (pendingMessage) {
      try {
        const { message, severity, duration } = JSON.parse(pendingMessage);
        localStorage.removeItem(PENDING_SNACKBAR_KEY);
        // Small delay to ensure the UI is ready
        setTimeout(() => {
          showSnackbar(message, severity, duration);
        }, 100);
      } catch {
        localStorage.removeItem(PENDING_SNACKBAR_KEY);
      }
    }
  }, []);

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
