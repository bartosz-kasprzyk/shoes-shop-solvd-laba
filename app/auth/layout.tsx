'use client';

import Image from 'next/image';
import ReviewCarousel from '@/features/layout/components/ReviewCarousel';
import type { Testimonial } from '@/features/layout/components/ReviewCarousel/interface';
import { Box, Button } from '@mui/material';
import Link from 'next/link';

const testimonials: Testimonial[] = [
  {
    quote:
      'Lorem Ipsum is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do.',
    author: 'John Stone',
    location: 'Ukraine, Chernivtsi',
    // rating: 5,
  },
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae pharetra metus, non blandit ante. Vivamus mi dui, suscipit sed sodales a, venenatis rutrum erat. Quisque sit amet ipsum sagittis, dignissim justo eu, tincidunt mi. Etiam vitae turpis ut enim elementum hendrerit mollis at justo. Etiam tristique odio vitae ipsum pulvinar, sit amet euismod lectus porttitor. Integer ut massa nec metus elementum rutrum quis nec lectus. Aenean ac leo et urna fermentum pharetra. Duis eget sapien sed tortor fringilla ullamcorper. Nullam eu risus neque. Nam sed pretium nunc. Phasellus in erat urna. In vitae ante in odio dignissim varius quis sed est. Phasellus nec turpis a lorem venenatis porta. Etiam faucibus ipsum non quam pellentesque, id fringilla elit lobortis. Quisque vulputate ex sit amet nulla ultrices pharetra.',
    author: 'Anna Kowalska',
    location: 'Polska, Warszawa',
    rating: 5,
  },
  {
    quote: 'Excellent communication and beautiful results!',
    author: 'Michael Lee',
    location: 'USA, New York',
    rating: 5,
  },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Layout container */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          bgcolor: 'white',
          display: 'flex',
        }}
      >
        {/* Left content */}
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button sx={{ width: 'auto' }} component={Link} href='/'>
            Home
          </Button>
          {children}
        </Box>

        {/* Right content */}
        <Box
          sx={{
            position: 'relative',
            flex: 1,
            height: '100%',
            width: '50%',
            display: { xs: 'none', lg: 'flex' },
            alignItems: 'flex-end',
          }}
        >
          {/* Background image */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
            }}
          >
            <Image
              src='/shoe-welcome.png'
              alt='overlay image'
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>

          {/* Carousel */}
          <Box
            sx={{
              width: '100%',
              height: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <ReviewCarousel testimonials={testimonials} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
