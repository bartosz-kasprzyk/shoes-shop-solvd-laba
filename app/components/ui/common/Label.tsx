import { Box, FormLabel } from '@mui/material';

interface LabelProps {
  id: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function Label({ id, required, children }: LabelProps) {
  return (
    <FormLabel
      htmlFor={id}
      sx={{
        color: 'var(--color-text-primary)',
        mb: { xs: 0.5, sm: 1 },
        fontWeight: 500,
        fontSize: { xs: '10px', sm: '12px', lg: '15px' },
      }}
    >
      {children}
      {required && (
        <Box component='span' sx={{ color: 'var(--color-primary)' }}>
          {' '}
          *
        </Box>
      )}
    </FormLabel>
  );
}
