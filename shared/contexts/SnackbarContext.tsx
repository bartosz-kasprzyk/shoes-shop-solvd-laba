import type { AlertColor } from '@mui/material';
import { createContext } from 'react';

// TODO: move it to separate folder
export type SnackbarContextType = {
  showSnackbar: (
    message: string,
    severity?: AlertColor,
    duration?: number,
  ) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);
