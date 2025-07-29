'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    primaryGrey: {
      main: string;
    };
  }

  interface PaletteOptions {
    primaryGrey?: {
      main: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#FE645E',
    },
    primaryGrey: {
      main: '#6e7378',
    },
  },
  typography: {
    fontFamily: 'var(--font-work-sans)',
  },
});

export default theme;
