'use client';

import Image from 'next/image';
import { CardsContainer } from './components';
import { Box } from '@mui/material';
import TestImage from './_mock/assets/img-2.png';
import ImageOverlay from './components/ui/ImageOverlay';

export default function HomePage() {
  return (
    <main className='space-y-4 p-8'>
      <CardsContainer />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ImageOverlay variant='delete'>
          <Image src={TestImage} alt='Test image' width={320} height={380} />
        </ImageOverlay>
      </Box>
    </main>
  );
}
