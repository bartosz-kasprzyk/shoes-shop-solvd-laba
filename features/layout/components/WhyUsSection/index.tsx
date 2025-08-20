'use client';

import { Box, Container } from '@mui/material';
import SectionHeader from './SectionHeader';
import FeaturesGrid from './FeaturesGrid';
import CallToAction from './CallToAction';

export default function WhyUsSection() {
  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: '#FAFAFA',
      }}
    >
      <Container maxWidth='lg'>
        <SectionHeader />
        <FeaturesGrid />
        <CallToAction />
      </Container>
    </Box>
  );
}
