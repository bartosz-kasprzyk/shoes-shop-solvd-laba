'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { usePathname } from 'next/navigation';

interface EmptyStateProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  icon: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonHref,
  icon,
}: EmptyStateProps) {
  const pathname = usePathname();
  return (
    <Box sx={{ flex: 1 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop:
            pathname === '/my-products'
              ? { xs: '20px', md: '30px' }
              : { xs: '50px', md: '100px' },
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            backgroundColor: '#f3f4f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 3,
          }}
        >
          {icon}
        </Box>

        <Typography
          variant='h6'
          sx={{
            fontWeight: 600,
            marginBottom: 1,
            color: '#1f2937',
            fontSize: { xs: 16, lg: 22 },
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant='body2'
            sx={{
              color: '#6b7280',
              marginBottom: 4,
              maxWidth: '360px',
              fontSize: { xs: 14, lg: 18 },
            }}
          >
            {description}
          </Typography>
        )}

        {buttonHref && (
          <Link href={buttonHref} passHref>
            <Button
              variant='primary'
              sx={{ p: 1, px: 2, mt: description ? 0 : 3 }}
            >
              {buttonText}
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
}
