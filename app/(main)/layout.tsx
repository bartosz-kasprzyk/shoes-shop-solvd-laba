import { Box } from '@mui/material';
import TopBar from '@/features/layout/components/TopBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <TopBar />
      <Box height={'100%'} overflow={'hidden'}>
        {children}
      </Box>
    </Box>
  );
}
