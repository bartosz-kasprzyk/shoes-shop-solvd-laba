import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import theme from './theme';
import CustomHeader from './components/ui/header';
import { Sidebar } from './components';

export const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shoes Shop - Solvd Laba',
  description: 'Modern shoes shopping experience',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <Box
            component='body'
            className={workSans.variable}
            sx={{
              color: 'black',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              margin: 0,
              padding: 0,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                height: '100vh',
                flexDirection: 'column',
              }}
            >
              <CustomHeader />
              <Box
                sx={{
                  display: 'flex',
                  flex: 1,
                }}
              >
                <Sidebar />
                {children}
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
