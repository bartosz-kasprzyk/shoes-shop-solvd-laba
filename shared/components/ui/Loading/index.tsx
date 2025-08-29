import { CircularProgress, Box } from '@mui/material';

export default function Spinner() {
  return (
    <Box display={'flex'} p={10} justifyContent={'center'}>
      <CircularProgress size={80} />
    </Box>
  );
}
