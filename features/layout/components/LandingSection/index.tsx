'use client';

import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HeroContent from './HeroContent';
import HeroImage from './HeroImage';

export default function LandingSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 'calc(100vh - 61px)', md: 'calc(100vh - 121px)' },
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}05 100%)`,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 8 },
          }}
        >
          <HeroContent />
          <HeroImage />
        </Box>
      </Container>
    </Box>
  );
}
