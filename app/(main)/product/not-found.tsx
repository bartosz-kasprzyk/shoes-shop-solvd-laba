'use client';

import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { removeRecentlyViewed } from '@/features/recently-viewed/utils/recentlyViewedUtils';
import { removeFromWishlist } from '@/features/wishlist/utils/wishlist';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();
  // delete from local storage wishlist and recently viewed
  const id = usePathname().split('/').slice(-1)[0];
  try {
    const parsedId = parseInt(id);
    removeFromWishlist(parsedId);
    removeRecentlyViewed(parsedId);
  } catch (e) {
    console.log(e);
  }

  return (
    <ScrollableContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          margin: { xs: '50px auto', md: '100px auto' },
          paddingX: { xs: 2, sm: 4 },
          justifyContent: 'center',
          width: '90%',
          maxWidth: '1454px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: '567px', md: 397, lg: 487, xl: 588 },
            height: { sm: 520, md: 424, lg: 520, xl: 628 },
            aspectRatio: '588 / 628',
            margin: 'auto',
            overflow: 'hidden',
          }}
        >
          <Image
            src={'/lost-shoe.png'}
            alt='Main product image'
            fill
            sizes='(max-width: 600px) 100vw, 588px'
            style={{ objectFit: 'cover', pointerEvents: 'none' }}
            priority
          />
        </Box>
        <Box
          sx={{
            maxWidth: { xs: '100%', sm: '567px', md: '522px' },
            width: '100%',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: { xs: '10px', lg: '105px' },
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <Typography
              sx={{
                lineHeight: 1,
                fontSize: { xs: 22, sm: 30, md: 35, lg: 38, xl: 45 },
                fontWeight: 500,
              }}
            >
              We are sorry
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: { xs: 20, lg: 30 },
              fontWeight: 500,
              color: '#A29F9F',
              marginBottom: { xs: '20px', xl: '47px' },
              marginLeft: '2px',
            }}
          >
            This Product is no longer available
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '26px',
              marginBottom: '65px',
              height: '61px',
            }}
          ></Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              color: 'var(--color-text-primary)',
            }}
          >
            <Typography fontWeight={500}>
              Even when you feel like you’ve lost something precious, remember:
              the world of shoes is vast and full of possibilities. Discover
              your next beloved pair <Link href={'/products'}>here</Link>.
            </Typography>
          </Box>
        </Box>
      </Box>
    </ScrollableContainer>
  );
}
