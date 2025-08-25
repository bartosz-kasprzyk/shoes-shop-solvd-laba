'use client';

import { Typography } from '@mui/material';
import { createContext, useContext } from 'react';
import { useFilterValuesByFilterType } from '../../hooks/useFilterValuesByFilterType';
import { useCountsByFilterValues } from '../../hooks/useCountsByFilterValues';
import type { FilterSectionProps } from './types';
import FilterSectionDropdown from '../FilterSectionDropdown';
import type { FilterType, FilterValue } from '../../types';
import useFilterStore from '../../stores/filterStore';
import { apiItemToFilterValue } from '../../utils/apiItemToFilterValue';

type FilterSectionContextType = {
  filterType: FilterType;
  filterValues: FilterValue[];
  filterCountByValue: Record<string, number>;
  areFiltersUsed: boolean;
  maxSelections?: number;
};

const FilterSectionContext = createContext<
  FilterSectionContextType | undefined
>(undefined);

export function useFilterSection() {
  const ctx = useContext(FilterSectionContext);
  if (!ctx) {
    throw new Error(
      'useFilterSection must be used within FilterSectionProvider',
    );
  }
  return ctx;
}

export default function FilterSection({
  filterType,
  maxSelections,
  Container,
}: FilterSectionProps) {
  const { data, isError, isLoading, isSuccess } =
    useFilterValuesByFilterType(filterType);

  const filterValues: FilterValue[] = (data ?? []).map(apiItemToFilterValue);

  const { filters } = useFilterStore();

  const areFiltersUsed =
    (filters[filterType] ?? []).length > 0 && !maxSelections;
  const filterCountByValue = useCountsByFilterValues(
    filterValues,
    filterType,
    filters,
  );
  return (
    <FilterSectionContext.Provider
      value={{
        filterType,
        filterValues,
        areFiltersUsed,
        filterCountByValue,
        maxSelections,
      }}
    >
      <FilterSectionDropdown
        filterType={filterType}
        filterCount={filters[filterType]?.length}
      >
        {isLoading && <Typography color='error'>Loading...</Typography>}
        {isError && (
          <Typography color='error'>Something went wrong...</Typography>
        )}
        {isSuccess && (
          <>
            <Container />
          </>
        )}
      </FilterSectionDropdown>
    </FilterSectionContext.Provider>
  );
}
