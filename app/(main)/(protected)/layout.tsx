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
      <UserSideBar />
      <Box sx={{ paddingLeft: '320px', paddingTop: '120px', width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
}
