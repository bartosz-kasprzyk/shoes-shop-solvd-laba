import { Card, Typography, Box } from '@mui/material';
import { DropDownMenu } from '@/shared/components/ui';
import Link from 'next/link';
import type { ProductCardProps } from '../../types';
import WishlistButton from '@/shared/components/ui/WishlistButton';
import Image from 'next/image';

export default function ProductCard({
  card,
  variant,
  onClick,
  filled,
}: ProductCardProps) {
  const { img, name, price, gender, id } = card;

  function renderButton() {
    switch (variant) {
      case 'dropdown':
        return <DropDownMenu id={id} />;

      case 'toggleWishlist':
        return (
          onClick && (
            <WishlistButton
              operation='toggle'
              filled={filled}
              onClick={onClick}
            />
          )
        );

      case 'removeFromWishlist':
        return <WishlistButton operation='remove' onClick={onClick} />;

      default:
        return null;
    }
  }

  return (
    <Card
      sx={{
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '11px',
        position: 'relative',
        transition: 'all 0.3s ease',
        borderRadius: 0,
        '&:hover': {
          boxShadow:
            '0 8px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)',

          // transform: 'translateY(-2px)',
        },
      }}
    >
      {variant && renderButton()}
      <Link
        href={`/product/${id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Image
          src={img.src}
          alt={name}
          title={name}
          width={320}
          height={380}
          priority
          style={{
            aspectRatio: '320 / 380',
            objectFit: 'cover',
            width: '100%',
            height: 'auto',
          }}
        />
        <Box sx={{ p: '10px' }}>
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
              width={'100%'}
              overflow='hidden'
              fontSize={{ xs: 10, sm: 16, lg: 22 }}
              whiteSpace={'nowrap'}
              textOverflow={'ellipsis'}
              fontWeight={500}
            >
              {name}
            </Typography>
            <Typography
              fontSize={{ xs: 10, sm: 16, lg: 22 }}
              fontWeight={500}
              sx={{ ml: 'auto' }}
            >
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(price)}
            </Typography>
          </Box>
          <Typography
            fontSize={{ xs: 9, sm: 12, lg: 18 }}
            fontWeight={500}
            color='#5C5C5C'
            component='p'
          >
            {`${gender}'s Shoes`}
          </Typography>
        </Box>
      </Link>
    </Card>
  );
}
