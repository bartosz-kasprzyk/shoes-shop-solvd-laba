'use client';

import { Box, Container, Typography, Link, Divider } from '@mui/material';
import CompanyLogoIcon from '@/shared/icons/CompanyLogoIcon';

export default function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: '#2E2E2E', // Dark grey background
        color: 'white',
        py: { xs: 6, md: 8 },
        mt: 'auto',
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 4,
          }}
        >
          {/* Company Info */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CompanyLogoIcon />
              <Typography
                variant='h6'
                sx={{
                  ml: 1,
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                ShoesShop
              </Typography>
            </Box>
            <Typography
              variant='body2'
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 2,
                lineHeight: 1.6,
              }}
            >
              Step into style with our premium collection of shoes. Quality,
              comfort, and fashion for every step of your journey.
            </Typography>
          </Box>

          {/* Quick Links */}
          <FooterSection
            title='Quick Links'
            links={['Home', 'Products', 'About Us', 'Contact']}
          />

          {/* Categories */}
          <FooterSection
            title='Categories'
            links={[
              "Men's Shoes",
              "Women's Shoes",
              "Kids' Shoes",
              'Sports Shoes',
              'Casual Shoes',
            ]}
          />

          {/* Customer Service */}
          <FooterSection
            title='Customer Service'
            links={[
              'Help Center',
              'Returns & Exchanges',
              'Size Guide',
              'Shipping Info',
              'Track Your Order',
            ]}
          />
        </Box>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Bottom Section */}
        <FooterBottom />
      </Container>
    </Box>
  );
}

function FooterSection({ title, links }: { title: string; links: string[] }) {
  return (
    <Box>
      <Typography
        variant='h6'
        sx={{
          fontWeight: 600,
          mb: 2,
          color: 'white',
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {links.map((item) => (
          <Link
            key={item}
            href='#'
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                color: 'white',
                textDecoration: 'underline',
              },
            }}
          >
            {item}
          </Link>
        ))}
      </Box>
    </Box>
  );
}

function FooterBottom() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography
        variant='body2'
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        © {new Date().getFullYear()} ShoesShop. All rights reserved.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', md: 'flex-end' },
        }}
      >
        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
          <Link
            key={item}
            href='#'
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                color: 'white',
                textDecoration: 'underline',
              },
            }}
          >
            {item}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
