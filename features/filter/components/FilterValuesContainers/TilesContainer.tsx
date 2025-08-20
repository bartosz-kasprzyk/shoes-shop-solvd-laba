'use client';

import { Box, Grid } from '@mui/material';
import TileItem from '../FilterValuesItems/TileItem';
import { useFilterSection } from '../FilterSection';
import useFilterStore from '../../stores/filterStore';

export default function TilesContainer() {
  const { filters, toggleFilterValue } = useFilterStore();
  const { filterType, filterValues, filterCountByValue, maxSelections } =
    useFilterSection();
  const displayedFilterValues = [...filterValues];
  displayedFilterValues.sort((a, b) => {
    const valA = parseInt(a.name ?? '0');
    const valB = parseInt(b.name ?? '0');
    return valA - valB;
  });

  return (
    <Box sx={{ overflowY: 'auto', pt: 2, scrollbarWidth: 'none' }}>
      <Grid container>
        {displayedFilterValues.map((filterValue) => {
          return (
            <Grid width={1 / 3} key={filterValue.slug}>
              <TileItem
                label={filterValue.name ?? filterValue.slug}
                active={(filters[filterType] ?? []).some(
                  (f) => f.slug === filterValue.slug,
                )}
                count={filterCountByValue[filterValue.slug]}
                onToggle={() => toggleFilterValue(filterType, filterValue)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
