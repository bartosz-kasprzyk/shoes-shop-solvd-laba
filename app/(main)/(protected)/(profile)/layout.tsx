import UserSideBar from '@/features/layout/components/UserSideBar';
import { Box } from '@mui/material';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box
        width={'40%'}
        maxWidth={'320px'}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        <UserSideBar />
      </Box>
      <Box height={'100%'} width={'100%'} overflow={'hidden'}>
        {children}
      </Box>
    </Box>
  );
}
