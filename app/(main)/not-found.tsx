'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { Button } from '@/shared/components/ui';

interface NotFoundProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  backButtonLabel?: string;
  homeButtonLabel?: string;
  hasHeader?: boolean;
}

export default function NotFound({
  title = 'Error 404',
  description = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna',
  imageSrc = '/error404.png',
  backButtonLabel = 'Go back',
  homeButtonLabel = 'Home',
  hasHeader = false,
}: NotFoundProps) {
  const router = useRouter();

  return (
    <ScrollableContainer>
      <Box
        sx={{
          height: hasHeader ? '100%' : '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Message & buttons */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            bgcolor: { xs: '#E5E5E7', md: 'transparent' },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              maxWidth: '538px',
              margin: '30px',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              sx={{ fontSize: { xs: '30px', md: '45px' }, fontWeight: 500 }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '12px', md: '20px' },
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
                marginY: '20px',
              }}
            >
              {description}
            </Typography>

            {/* Desktop buttons */}
            <Box
              sx={{
                display: { xs: 'none', md: 'grid' },
                gap: '30px',
                gridTemplateColumns: 'auto auto',
                justifyContent: 'start',
              }}
            >
              <Button
                variant='outline'
                sx={{ width: '152px', height: '40px' }}
                onClick={() => router.back()}
              >
                {backButtonLabel}
              </Button>
              <Button
                component={Link}
                sx={{ width: '152px', height: '40px' }}
                href='/'
              >
                {homeButtonLabel}
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '50%' },
            height: 'auto',
            flexGrow: 1,
            minHeight: '50vh',
            paddingTop: { xs: '80px', sm: '360px', md: 0 },
            marginTop: { xs: '-50px', md: 0 },
            borderRadius: { xs: '39px', md: 0 },
            overflow: 'hidden',
          }}
        >
          <Image
            src={imageSrc}
            alt='overlay image'
            fill
            priority
            sizes='(max-width: 900px) 100vw, 50vw'
            style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
          />
        </Box>

        {/* Mobile buttons */}
        <Box
          sx={{
            display: { xs: 'grid', md: 'none' },
            gap: '16px',
            gridTemplateColumns: '1fr 1fr',
            padding: '36px 20px',
          }}
        >
          <Button
            variant='outline'
            sx={{ height: '40px' }}
            onClick={() => router.back()}
          >
            {backButtonLabel}
          </Button>
          <Button component={Link} sx={{ height: '40px' }} href='/'>
            {homeButtonLabel}
          </Button>
        </Box>
      </Box>
    </ScrollableContainer>
  );
}
