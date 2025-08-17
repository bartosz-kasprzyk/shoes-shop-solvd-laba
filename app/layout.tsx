import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/nextauth/authOptions';
import { Providers } from './providers';

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
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
