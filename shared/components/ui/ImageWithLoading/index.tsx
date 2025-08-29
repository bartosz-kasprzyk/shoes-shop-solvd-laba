import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Skeleton, Box } from '@mui/material';

interface ImageWithLoadingProps extends ImageProps {
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

export function ImageWithLoading({
  children,
  sx,
  ...props
}: ImageWithLoadingProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      sx={{
        // position: 'relative',
        display: 'inline-block',
        width: props.width,
        height: props.height,
        ...sx,
      }}
    >
      {!loaded && <Skeleton variant='rectangular' width='100%' height='100%' />}
      <Image
        {...props}
        priority
        onLoad={() => setLoaded(true)}
        style={{
          display: loaded ? 'block' : 'none',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {children && loaded && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}
