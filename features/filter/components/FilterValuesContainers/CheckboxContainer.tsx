'use client';

import { Box, Grid, List, ListItem } from '@mui/material';
import CheckboxItem from '../FilterValuesItems/CheckboxItem';
import { useFilterSection } from '../FilterSection';
import { useSearch } from '../SearchWrapper/SearchWrapper';
import useFilterStore from '../../stores/filterStore';

export default function CheckboxContainer() {
  const { filters, toggleFilterValue } = useFilterStore();
  const { filterType, filterValues, filterCountByValue, maxSelections } =
    useFilterSection();
  const { displayedFilterValues } = useSearch();
  return (
    <Box sx={{ overflowY: 'auto', scrollbarWidth: 'none' }}>
      <List>
        {(displayedFilterValues ?? filterValues).map((filterValue) => {
          return (
            <Box key={filterValue.slug}>
              <CheckboxItem
                label={filterValue.name ?? filterValue.slug}
                active={(filters[filterType] ?? []).some(
                  (f) => f.slug === filterValue.slug,
                )}
                count={filterCountByValue[filterValue.slug]}
                onToggle={() =>
                  toggleFilterValue(filterType, filterValue, maxSelections)
                }
              />
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
