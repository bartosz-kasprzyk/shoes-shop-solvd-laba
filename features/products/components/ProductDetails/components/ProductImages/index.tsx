import { Box } from '@mui/material';
import Image from 'next/image';
import ArrowIcon from '@/shared/icons/HorizontalArrowIcon';
import { useState, useRef, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { ProductImagesProps } from '@/features/products/types/components.interface';
import { RoundButton } from '../RoundButton';

export default function ProductImages({ images }: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, [isDragging]);

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleClick = (index: number) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
  };

  const handleStart = (clientX: number) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !isMobile) return;
    const offset = clientX - startX;
    setDragOffset(offset);
  };

  const handleEnd = () => {
    if (!isDragging || !isMobile) return;
    setIsDragging(false);

    const threshold = 50;
    if (dragOffset > threshold && selectedIndex > 0) {
      handlePrev();
    } else if (dragOffset < -threshold && selectedIndex < images.length - 1) {
      handleNext();
    }

    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
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
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          gap: { sm: '12px', md: '10px', lg: '12px', xl: '16px' },
        }}
      >
        {images.map((img, index) => (
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
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          width: { xs: '100%', sm: 487, md: 397, lg: 487, xl: 588 },
          height: { sm: 520, md: 424, lg: 520, xl: 628 },
          aspectRatio: '588 / 628',
          overflow: 'hidden',
          cursor:
            isMobile && isDragging ? 'grabbing' : isMobile ? 'grab' : 'default',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        <Box
          sx={{
            display: 'flex',
            width: `${images.length * 100}%`,
            height: '100%',
            transform: `translateX(calc(-${selectedIndex * 100}% / ${images.length} + ${isDragging ? dragOffset : 0}px))`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {images.map((img, index) => (
            <Box
              key={img.attributes.url}
              sx={{
                width: `${100 / images.length}%`,
                height: '100%',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <Image
                src={img.attributes.url}
                alt={`Product image ${index + 1}`}
                fill
                sizes='(max-width: 600px) 100vw, 588px'
                style={{ objectFit: 'cover', pointerEvents: 'none' }}
                priority={index === 0}
              />
            </Box>
          ))}
        </Box>
        {images.length > 1 ? (
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
              disabled={selectedIndex === images.length - 1}
            >
              <ArrowIcon />
            </RoundButton>
          </Box>
        ) : null}
      </Box>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {images.map((_, index) => (
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
