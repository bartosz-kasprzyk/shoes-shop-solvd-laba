import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { BagIcon } from '@/shared/icons';

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonHref,
  icon,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          width: { xs: 56, sm: 64, md: 72 },
          height: { xs: 56, sm: 64, md: 72 },
          backgroundColor: '#f3f4f6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: { xs: 2, sm: 3 },
        }}
      >
        {icon || <BagIcon />}
      </Box>
      <Typography
        variant='h6'
        sx={{
          fontWeight: 600,
          marginBottom: { xs: 1, sm: 1.5 },
          color: '#1f2937',
          fontSize: { xs: 18, sm: 20, md: 22 },
          lineHeight: 1.3,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant='body2'
        sx={{
          color: '#6b7280',
          marginBottom: { xs: 3, sm: 4 },
          maxWidth: { xs: '280px', sm: '320px', md: '360px' },
          fontSize: { xs: 14, sm: 16, md: 18 },
          lineHeight: 1.5,
          px: { xs: 1, sm: 0 },
        }}
      >
        {description}
      </Typography>

      <Link href={buttonHref} passHref>
        <Button variant='primary'>{buttonText}</Button>
      </Link>
    </Box>
  );
}
