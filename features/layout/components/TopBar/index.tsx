'use client';

import { Box, Collapse, Fade, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { CompanyLogoIcon } from '@/shared/icons/';
import Link from 'next/link';
import TopBarCart from './TopBarCart';

import { useRef, useState } from 'react';
import TopBarSearch from './TopBarSearch';
import { XIcon } from '@/shared/icons/XIcon';
import useUser from '@/shared/hooks/useUser';
import TopBarMenu from '../TopBarMenu';

export default function TopBar() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  // Ref for direct access to input element
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExpand = (isOpen: boolean) => {
    setIsSearchBarOpen(isOpen);
    setTimeout(() => {
      if (inputRef.current) {
        if (isOpen) inputRef.current.focus();
        else inputRef.current.blur();
      }
    }, 300);
  };

  // Handle Enter key press on search input to navigate to search results
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim() !== '') {
      router.push(`/products/search:${encodeURIComponent(searchValue.trim())}`);
      if (inputRef.current) {
        inputRef.current.blur();
      }
      setIsSearchBarOpen(false);
    }
  };

  const { session } = useUser();

  const user = session?.user
    ? {
        name: session.user.name ?? 'Anonymous',
        avatar: session.user.image || undefined,
      }
    : null;

  return (
    <>
      {/* Header container */}
      <Box
        sx={{
          position: 'relative',
          overflowY: 'visible',
          maxWidth: '100%',
          bgcolor: 'blue',
          width: '100vw',
          height: { xs: 60, sm: 120 },
          borderBottom: !isSearchBarOpen ? '1px solid #e5e7eb' : 'none',
          backgroundColor: 'white',
          boxShadow: 'none',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1001,
        }}
      >
        {/* Inner container with max width and padding */}
        <Box
          position='relative'
          sx={{
            width: '100%',
            flexBasis: '100%',
            maxWidth: '1920px',
            margin: '0 auto',
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Top bar flex container */}
          <Box
            position='relative'
            sx={{
              display: 'flex',
              width: '100%',
              boxSizing: 'border-box',
              height: '64px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Left section with logo and product link */}
            <Box
              position='relative'
              width='auto'
              sx={{
                display: 'flex',
                boxSizing: 'border-box',
                alignItems: 'center',
                gap: 2,
              }}
            >
              {/* Desktop logo */}
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <CompanyLogoIcon />
              </Box>

              {/* Collapse for mobile logo and product link */}
              <Box>
                <Collapse orientation='horizontal' in={!isSearchBarOpen}>
                  {/* Mobile logo */}
                  <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <CompanyLogoIcon />
                  </Box>

                  {/* Products link visible on desktop */}
                  <Box
                    component={Link}
                    href='/products'
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      textDecoration: 'none',
                      fontWeight: 500,
                      color: '#000',
                    }}
                  >
                    Products
                  </Box>
                </Collapse>
              </Box>
            </Box>

            {/* Center section: search input and cart icon */}
            <Box
              width='100%'
              maxWidth='100%'
              height='100%'
              display='flex'
              flexDirection='column'
              alignContent='center'
              alignItems='center'
              sx={{ overflowY: 'visible' }}
              position='relative'
              boxSizing='border-box'
              justifyContent='center'
            >
              <Box
                width={{ xs: '100%', sm: isSearchBarOpen ? '80%' : '100%' }}
                maxWidth={{
                  xs: '100%',
                  sm: isSearchBarOpen ? '1000px' : '100%',
                }}
                height={{ xs: '70%', sm: isSearchBarOpen ? '100%' : '70%' }}
                display='flex'
                alignItems='center'
                sx={{
                  transition:
                    'width 300ms ease-in-out, max-width 300ms ease-in-out, height 300ms ease-in-out',
                  overflowY: 'visible',
                }}
                position='relative'
                boxSizing='border-box'
                justifyContent='flex-end'
              >
                {/* Cart icon on mobile when search bar closed */}
                <Box
                  display={{
                    xs: isSearchBarOpen ? 'none' : 'flex',
                    sm: 'none',
                  }}
                >
                  <TopBarCart />
                </Box>

                {/* Search input */}
                <TopBarSearch
                  isExpanded={isSearchBarOpen}
                  handleExpand={handleExpand}
                  width='auto'
                  height='100%'
                  value={searchValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchValue(e.target.value)
                  }
                  onKeyDown={handleSearchKeyDown}
                  inputRef={inputRef}
                />
              </Box>
            </Box>

            {/* Right section: cart, menu and close button */}
            <Box display='flex' width='auto'>
              <Box display='flex' overflow='hidden' width='auto'>
                {/* Cart and menu visible when search bar is closed */}
                <Collapse
                  orientation='horizontal'
                  in={!isSearchBarOpen}
                  sx={{ boxSizing: 'border-box', overflow: 'hidden' }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                      display: 'flex',
                      gap: { xs: 0, sm: 1 },
                    }}
                  >
                    {/* Cart icon desktop */}
                    <Box
                      sx={{
                        aspectRatio: '1 / 1',
                        height: '100%',
                        width: 'auto',
                        display: { xs: 'none', sm: 'block' },
                      }}
                    >
                      <TopBarCart />
                    </Box>

                    {/* Menu */}
                    <TopBarMenu user={user} />
                  </Box>
                </Collapse>
              </Box>

              {/* Close icon when search bar is open */}
              <Box>
                <Collapse orientation='horizontal' in={isSearchBarOpen}>
                  <Box sx={{ width: 'auto', aspectRatio: '1 / 1' }}>
                    <IconButton onClick={() => setIsSearchBarOpen(false)}>
                      <XIcon />
                    </IconButton>
                  </Box>
                </Collapse>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Background overlay to close search bar on click */}
      <Fade in={isSearchBarOpen}>
        <Box
          sx={{
            pointerEvents: 'painted',
            left: 0,
            zIndex: 100,
            position: 'absolute',
            height: '100%',
            width: '100%',
            bgcolor: 'color-mix(in srgb, black 30%, white 20%)',
          }}
          onClick={() => setIsSearchBarOpen(false)}
        />
      </Fade>
    </>
  );
}
