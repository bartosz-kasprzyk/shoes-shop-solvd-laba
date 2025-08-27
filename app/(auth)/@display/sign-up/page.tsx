import Image from 'next/image';
import ReviewCarousel from '@/features/layout/components/ReviewCarousel';
import { Box } from '@mui/material';
import type { Testimonial } from '@/features/layout/components/ReviewCarousel/interface';

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

export default function ResetPasswordDisplay() {
  return (
    <>
      <Image
        src='/shoe-welcome.png'
        alt='overlay image'
        fill
        sizes='(max-width: 1200px) 0vw, 50vw'
        style={{ objectFit: 'cover' }}
        priority
      />

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
    </>
  );
}
