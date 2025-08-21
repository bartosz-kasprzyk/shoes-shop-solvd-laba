import { authOptions } from '@/features/auth/nextauth/authOptions';
import UserSideBar from '@/features/layout/components/UserSideBar';
import ServerSessionProvider from '@/shared/providers/ServerSessionProvider';
import { Box } from '@mui/material';
import { headers } from 'next/headers';

import { getServerSession } from 'next-auth';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  const shouldHideSidebar =
    pathname.includes('/cart') || pathname.includes('/checkout');
  const session = await getServerSession(authOptions);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {!shouldHideSidebar && (
        <Box
          width={'40%'}
          maxWidth={'320px'}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <UserSideBar />
        </Box>
      )}
      <Box height={'100%'} width={'100%'} overflow={'hidden'}>
        <ServerSessionProvider session={session}>
          {children}
        </ServerSessionProvider>
      </Box>
    </Box>
  );
}
