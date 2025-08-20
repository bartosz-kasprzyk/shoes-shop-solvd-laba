import { Box } from '@mui/material';
import LandingSection from '@/features/layout/components/LandingSection';
import WhyUsSection from '@/features/layout/components/WhyUsSection';
import Footer from '@/features/layout/components/Footer';

export default function HomePage() {
  return (
    <Box
      sx={{
        overflowY: 'auto',
        height: '100%',
        overflowX: 'hidden',
      }}
    >
      <LandingSection />
      <WhyUsSection />
      <Footer />
    </Box>
  );
}
