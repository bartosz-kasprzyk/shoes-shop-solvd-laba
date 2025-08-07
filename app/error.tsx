'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../shared/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function LostPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 'auto', sm: '100vh' },
        width: '100vw',
        bgcolor: 'white',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: { xs: 'flex-start', sm: 'center', lg: 'flex-start' },
      }}
    >
      {/* Desktop Background Image */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <Image
          src='/error-lost.png'
          alt='background image'
          style={{ objectFit: 'cover', objectPosition: '80% 50%' }}
          fill
          priority
          sizes='100vw'
        />
      </Box>

      {/* Gradient Overlay Container */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {/* CSS gradient */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            background: {
              sm: `
    linear-gradient(to top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%),
    linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)
  `,
              lg: 'linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
            },
          }}
        />
      </Box>

      {/* Large screen content */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: '538px',
          ml: { md: 0, lg: '250px' },
          mt: { sm: '250px', lg: '322px' },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: '45px',
            fontWeight: 500,
            textAlign: { sm: 'center', lg: 'left' },
          }}
        >
          We lost that page...
        </Typography>
        <Typography
          sx={{
            fontSize: '20px',
            color: 'var(--color-text-secondary)',
            fontWeight: 500,
            my: '20px',
            textAlign: { sm: 'center', lg: 'left' },
          }}
        >
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: '13px', md: '30px' },
            gridTemplateColumns: '1fr 1fr',
            width: { sm: '450px', lg: '320px' },
            mt: { sm: '290px', lg: 0 },
            mx: { sm: 'auto', lg: 0 },
          }}
        >
          <Button
            variant='outline'
            sx={{ height: '40px' }}
            onClick={() => router.back()}
          >
            Go back
          </Button>
          <Button component={Link} href='/' sx={{ height: '40px' }}>
            Home
          </Button>
        </Box>
      </Box>

      {/* Mobile layout */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'column',
          zIndex: 1,
          position: 'relative',
        }}
      >
        <Box sx={{ px: 3, py: 1, marginTop: '25px', bgcolor: 'white' }}>
          <Typography
            sx={{ fontSize: '30px', fontWeight: 500, textAlign: 'center' }}
          >
            We lost that page
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '443px',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              src='/error-lost.png'
              alt='background image'
              fill
              priority
              sizes='150vw'
              style={{ objectFit: 'cover', objectPosition: '82% center' }}
            />
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              py: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: '12px',
                color: 'white',
                fontWeight: 500,
                textAlign: 'center',
                maxWidth: '80%',
                m: 'auto',
              }}
            >
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            m: '20px auto',
          }}
        >
          <Button
            component={Link}
            sx={{ width: '233px', height: '40px' }}
            href='/'
          >
            Back home
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
