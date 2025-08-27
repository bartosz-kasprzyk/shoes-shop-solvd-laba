import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { Providers } from './providers';
import Chatbot from '@/features/ai/components/Chatbot';

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
    <html lang='en' className={workSans.className}>
      <body>
        <Providers>
          {children}
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}
