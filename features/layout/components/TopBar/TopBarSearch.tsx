'use client';

import { SearchIcon } from '@/shared/icons';
import type { BoxProps } from '@mui/material';
import { Box, Fade, IconButton, TextField } from '@mui/material';
import SearchSuggestions from './SearchSuggestions';

export default function TopBarSearch({
  value,
  onChange,
  handleExpand,
  onKeyDown,
  isExpanded,
  inputRef,
}: BoxProps & {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleExpand: (isOpen: boolean) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isExpanded: boolean;
  inputRef: React.Ref<HTMLInputElement>;
}) {
  return (
    <>
      {/* Search icon visible only on mobile when search is collapsed */}
      <IconButton
        onClick={() => handleExpand(true)}
        sx={{
          display: { xs: isExpanded ? 'none' : 'flex', md: 'none' },
          left: 0,
          height: '80%',
          width: 'auto',
          p: 0,
          aspectRatio: '1 / 1',
          alignItems: 'center',
        }}
      >
        <SearchIcon sx={{ mx: 'auto', height: '70%', width: '70%' }} />
      </IconButton>

      {/* Main wrapper for search field */}
      <Box
        // {...props}
        sx={{
          overflowY: 'visible',
          height: '95%',
          fontSize: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          maxWidth: '100%',
          width: !isExpanded ? { xs: '0px', md: '25ch' } : '100%',
          transition: 'width 300ms ease-in-out',
        }}
      >
        {/* Search input field */}
        <TextField
          value={value}
          onChange={onChange}
          onClick={() => handleExpand(true)}
          onKeyDown={onKeyDown}
          inputRef={inputRef}
          placeholder='Search'
          data-testid='topbar-search'
          slotProps={{
            input: {
              inputProps: {
                autoComplete: 'off',
              },
              startAdornment: (
                <>
                  {/* Icon inside search input (mobile & desktop) */}
                  <Box
                    sx={{
                      display: { xs: isExpanded ? 'flex' : 'none', md: 'flex' },
                      left: 0,
                      height: '100%',
                      width: 'auto',
                      p: 0,
                      aspectRatio: '1 / 1',
                      position: 'absolute',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconButton
                      onClick={() => handleExpand(true)}
                      sx={{
                        display: 'flex',
                        left: 0,
                        height: '80%',
                        width: 'auto',
                        p: 0,
                        aspectRatio: '1 / 1',
                        alignItems: 'center',
                      }}
                    >
                      <SearchIcon
                        sx={{ mx: 'auto', height: '70%', width: '70%' }}
                      />
                    </IconButton>
                  </Box>

                  {/* Empty space on the left side of the input text */}
                  <Box
                    sx={{
                      mr: isExpanded ? 1 : { xs: 0, md: 0 },
                      display: 'flex',
                      height: '100%',
                      pointerEvents: 'none',
                      width: 'auto',
                      aspectRatio: '1 / 1',
                      alignItems: 'center',
                    }}
                  />
                </>
              ),
            },
          }}
          sx={{
            width: '100%',
            height: '100%',
            '& .MuiOutlinedInput-root': {
              mx: 0,
              px: 0,
              height: '100%',
              borderRadius: '9999px',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: {
                  xs: isExpanded ? '#494949' : 'transparent',
                  md: '#494949',
                },
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: isExpanded ? '#494949' : 'transparent',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: {
                  xs: isExpanded ? '#494949' : 'transparent',
                  md: '#494949',
                },
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#5C5C5C',
              opacity: { xs: isExpanded ? 1 : 0, md: 1 },
            },
            '& .MuiInputBase-input': {
              pl: 0,
              pr: 1,
              mx: 0,
              color: '#5C5C5C',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              opacity: { xs: isExpanded ? 1 : 0, md: 1 },
            },
          }}
        />

        {/* Popular search terms list (shown when expanded) */}
        <Box position='relative' width='100%' overflow={'visible'}>
          <Fade in={isExpanded}>
            <Box
              zIndex={10003}
              bgcolor='white'
              width='100%'
              sx={{
                top: 0,
                left: 0,
                position: 'absolute',
                overflowY: 'visible',
              }}
            >
              <Box
                position='relative'
                height='auto'
                minHeight={'20vh'}
                zIndex={1111101}
              >
                <Box
                  display='flex'
                  overflow={'clip'}
                  flexDirection='column'
                  gap='0.8em'
                  pt='2em'
                  pb='2em'
                >
                  <SearchSuggestions term={value} />
                </Box>

                <Box
                  bgcolor='white'
                  position='absolute'
                  zIndex={-1}
                  top={0}
                  left={'-100vw'}
                  sx={{ width: '210vw', height: { xs: '220px', sm: '250px' } }}
                />
              </Box>
            </Box>
          </Fade>
        </Box>
      </Box>
    </>
  );
}
