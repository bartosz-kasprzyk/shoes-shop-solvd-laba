import { FormLabel } from '@mui/material';

interface LabelProps {
  id: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function Label({ id, required, children }: LabelProps) {
  return (
    <FormLabel
      htmlFor={id}
      data-testid={required ? 'label-required' : 'label'}
      sx={{
        color: 'var(--color-text-primary)',
        mb: { xs: 0.5, sm: 1 },
        fontWeight: 500,
        fontSize: { xs: '10px', sm: '12px', lg: '15px' },
        '&.Mui-focused': {
          color: 'var(--color-text-primary)',
        },
        ...(required && {
          '&::after': {
            content: '" *"',
            color: 'var(--color-primary)',
          },
        }),
      }}
    >
      {children}
    </FormLabel>
  );
}
