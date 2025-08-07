import { Box } from '@mui/material';

export function AuthPagesWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box mx='auto' maxWidth='580px' width='100%' my={4}>
      {children}
    </Box>
  );
}
