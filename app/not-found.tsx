'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../shared/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      {/* Page container */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        {/* Message & desktop buttons */}
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '50%',
            },
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
              Error 404
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '12px', md: '20px' },
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
                marginY: '20px',
              }}
            >
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna
            </Typography>
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
                sx={{
                  width: '152px',
                  height: '40px',
                }}
                onClick={() => router.back()}
              >
                Go back
              </Button>
              <Button
                component={Link}
                sx={{
                  width: '152px',
                  height: '40px',
                }}
                href='/'
              >
                Home
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            width: {
              xs: '100%',
              md: '50%',
            },
            height: {
              xs: 'auto',
              md: '100%',
            },
            minHeight: '50vh',
            paddingTop: { xs: '80px', sm: '360px', md: 0 },
            marginTop: {
              xs: '-50px',
              md: 0,
            },
            borderRadius: {
              xs: '39px',
              md: 0,
            },
            overflow: 'hidden',
          }}
        >
          <Image
            src='/error404.png'
            alt='overlay image'
            fill
            priority
            sizes='(max-width: 900px) 100vw, 50vw'
            style={{
              objectFit: 'cover',
              objectPosition: 'center 60%',
            }}
          />
        </Box>

        {/* Mobile buttons */}
        <Box
          sx={{
            display: { xs: 'grid', md: 'none' },
            gap: '16px',
            gridTemplateColumns: '1fr 1fr',
            margin: '36px 20px',
          }}
        >
          <Button
            variant='outline'
            sx={{
              height: '40px',
            }}
            onClick={() => router.back()}
          >
            Go back
          </Button>
          <Button
            component={Link}
            sx={{
              height: '40px',
            }}
            href='/'
          >
            Home
          </Button>
        </Box>
      </Box>
    </>
  );
}
