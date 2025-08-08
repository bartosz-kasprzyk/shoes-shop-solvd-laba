import { Box } from '@mui/material';

export function ScrollableContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        overflowY: 'auto',
        height: '100%',
        overflowX: 'hidden',
      }}
    >
      {children}
    </Box>
  );
}
