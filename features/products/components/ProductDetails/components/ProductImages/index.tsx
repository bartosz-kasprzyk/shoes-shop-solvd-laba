import { Box } from '@mui/material';
import Image from 'next/image';
import ArrowIcon from '@/shared/icons/HorizontalArrowIcon';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProductImagesProps } from '@/features/products/types/components.interface';
import { RoundButton } from '../RoundButton';

export default function ProductImages({ images }: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const isMobile = useMediaQuery('(max-width:600px)');

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isMobile ? 400 : 700) : isMobile ? -400 : -700,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? (isMobile ? -400 : -700) : isMobile ? 400 : 700,
      opacity: 0,
    }),
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setDirection(-1);
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < images?.length - 1) {
      setDirection(1);
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleClick = (index: number) => {
    if (index === selectedIndex) return;

    setDirection(index > selectedIndex ? 1 : -1);
    setSelectedIndex(index);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'center',
        gap: 2,
        marginRight: { xs: 0, lg: '10px', xl: '102px' },
      }}
    >
      {/* Thumbnails (left side, vertical list) */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          gap: { sm: '12px', md: '10px', lg: '12px', xl: '16px' },
        }}
      >
        {images?.map((img, index) => (
          <Box
            key={index}
            onClick={() => handleClick(index)}
            sx={{
              cursor: 'pointer',
              width: { sm: 64, md: 52, lg: 64, xl: 76 },
              height: { sm: 64, md: 52, lg: 64, xl: 76 },
              overflow: 'hidden',
              boxSizing: 'border-box',
              border:
                index === selectedIndex
                  ? '2px solid var(--color-primary)'
                  : '1px solid transparent',
              transition: 'filter 0.2s ease',
              '&:hover': {
                filter: 'brightness(0.9)',
              },
            }}
          >
            <Image
              src={img.attributes.url}
              alt={`Thumbnail ${index}`}
              width={76}
              height={76}
              style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Main image */}
      <Box
        sx={{
          position: 'relative',
          width: { xs: '100%', sm: 487, md: 397, lg: 487, xl: 588 },
          height: { sm: 520, md: 424, lg: 520, xl: 628 },
          aspectRatio: '588 / 628',
          overflow: 'hidden',
        }}
      >
        {images ? (
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={images[selectedIndex].attributes.url}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{ duration: 0.3 }}
              {...(isMobile && {
                drag: 'x',
                dragConstraints: { left: 0, right: 0 },
                onDragEnd: (_, info) => {
                  if (info.offset.x < -50) handleNext();
                  else if (info.offset.x > 50) handlePrev();
                },
                whileTap: { cursor: 'grabbing' },
              })}
              style={
                {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                } as React.CSSProperties
              }
            >
              <Image
                src={images[selectedIndex].attributes.url}
                alt='Main product image'
                fill
                sizes='(max-width: 600px) 100vw, 588px'
                style={{ objectFit: 'cover', pointerEvents: 'none' }}
                priority
              />
            </motion.div>
          </AnimatePresence>
        ) : null}
        {/* Desktop arrows bottom-right */}
        {images?.length > 1 ? (
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              position: 'absolute',
              bottom: 24,
              right: 32,
              gap: 1,
            }}
          >
            <RoundButton
              size='small'
              onClick={handlePrev}
              disabled={selectedIndex === 0}
            >
              <ArrowIcon flip />
            </RoundButton>
            <RoundButton
              size='small'
              onClick={handleNext}
              disabled={selectedIndex === images?.length - 1}
            >
              <ArrowIcon />
            </RoundButton>
          </Box>
        ) : null}
      </Box>
      {/* Mobile dot indicators below image */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {images?.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleClick(index)}
            role='button'
            aria-label={`Select image ${index + 1}`}
            sx={{
              width: index === selectedIndex ? '10px' : '8px',
              height: index === selectedIndex ? '10px' : '8px',
              borderRadius: '50%',
              backgroundColor:
                index === selectedIndex ? 'var(--color-text-primary)' : '#ccc',
              cursor: 'pointer',
              transition: 'background-color 0.3s, transform 0.2s, filter 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                filter: 'brightness(0.8)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
