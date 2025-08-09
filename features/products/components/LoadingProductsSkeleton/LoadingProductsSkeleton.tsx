import ProductCard from '@/features/products/components/ProductCard';
import { DropDownMenu, ImageOverlay } from '@/shared/components/ui';
import {
  Box,
  Card,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';

export default function LoadingProductsSkeleton() {
  const products = [];
  for (let i = 0; i < 24; i++) {
    products.push(i);
  }

  return (
    <>
      {products.map((product) => (
        <Grid key={product} size={{ xs: 6, md: 4, lg: 3 }}>
          <ProductCardSkeleton />
        </Grid>
      ))}
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <Box
      sx={{
        boxSizing: 'content-box',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease',
        border: '1px solid transparent',
        padding: '5px',
        gap: '11px',
        borderRadius: 0,
      }}
    >
      <Box>
        <Skeleton
          variant='rectangular'
          sx={{
            borderRadius: '4px',
            width: '100%',
            height: 'auto',
            aspectRatio: '320 / 380',
          }}
        />
        <div>
          <Box
            sx={{
              display: 'flex',
              gap: '15px',
              width: '100%',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            <Typography
              width={'70%'}
              overflow='hidden'
              fontSize={{ xs: 10, sm: 16, lg: 22 }}
              whiteSpace={'nowrap'}
              textOverflow={'ellipsis'}
              fontWeight={500}
            >
              <Skeleton
                variant='text'
                sx={{ fontSize: { xs: 10, sm: 16, lg: 22 } }}
              />
            </Typography>
            <Typography
              width={'30%'}
              fontSize={{ xs: 10, sm: 16, lg: 22 }}
              fontWeight={500}
              sx={{ ml: 'auto' }}
            >
              <Skeleton
                variant='text'
                sx={{ fontWeight: 500, fontSize: { xs: 10, sm: 16, lg: 22 } }}
              />
            </Typography>
          </Box>
          <Typography
            width={'80%'}
            fontSize={{ xs: 9, sm: 12, lg: 18 }}
            fontWeight={500}
            color='#5C5C5C'
          >
            <Skeleton
              variant='text'
              sx={{ fontWeight: 500, fontSize: { xs: 9, sm: 12, lg: 18 } }}
            />
          </Typography>
        </div>
      </Box>
    </Box>
  );
}
