import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { getServerSession } from 'next-auth';
import SessionProvider from './SessionProvider';
import { authOptions } from '@/features/auth/nextauth/authOptions';
import QueryProvider from './QueryProvider';

export const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shoes Shop - Solvd Laba',
  description: 'Modern shoes shopping experience',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en' className={workSans.className}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <body className='font-default text-black antialiased'>
          <SessionProvider session={session}>
            <QueryProvider>
              <ThemeProvider theme={theme}>
                <div className='flex h-screen flex-col'>
                  <div className='flex flex-1'>{children}</div>
                </div>
              </ThemeProvider>
            </QueryProvider>
          </SessionProvider>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
