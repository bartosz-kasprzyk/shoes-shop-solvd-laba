import { create } from 'zustand';
import type { Filter, FilterType, FilterValue } from '../types';

type FiltersState = {
  filters: Filter;
  addFilterValue: (type: FilterType, value: FilterValue) => void;
  removeFilterValue: (type: FilterType, value: FilterValue) => void;
  setFilterValues: (type: FilterType, values: FilterValue[]) => void;
  setAllFilterValues: (filter: Filter) => void;
  toggleFilterValue: (
    type: FilterType,
    value: FilterValue,
    maxSelections?: number,
  ) => void;
  applyFilters: () => string;
  resetFilters: () => void;
};

const useFilterStore = create<FiltersState>((set, get) => ({
  filters: {},

  addFilterValue: (type, value) =>
    set((state) => {
      const currentValues = state.filters[type] || [];
      if (currentValues.includes(value)) return state;
      return {
        filters: {
          ...state.filters,
          [type]: [...currentValues, value],
        },
      };
    }),

  removeFilterValue: (type, value) =>
    set((state) => {
      const currentValues = state.filters[type] || [];
      return {
        filters: {
          ...state.filters,
          [type]: currentValues.filter((v) => v.slug !== value.slug),
        },
      };
    }),

  toggleFilterValue: (
    type: FilterType,
    value: FilterValue,
    maxSelections?: number,
  ) =>
    set((state) => {
      const currentValues = state.filters[type] || [];

      if (currentValues.some((c) => c.slug === value.slug)) {
        return {
          filters: {
            ...state.filters,
            [type]: currentValues.filter((v) => v.slug !== value.slug),
          },
        };
      }

      if (maxSelections && currentValues.length >= maxSelections) {
        if (maxSelections === 1) {
          return {
            filters: {
              ...state.filters,
              [type]: [value],
            },
          };
        }
        return state;
      }
      return {
        filters: {
          ...state.filters,
          [type]: [...currentValues, value],
        },
      };
    }),

  setFilterValues: (type, values) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [type]: values,
      },
    })),

  setAllFilterValues: (filter) =>
    set(() => ({
      filters: {
        ...filter,
      },
    })),

  applyFilters: () => {
    const { filters } = get();
    const segments: string[] = Object.entries(filters)
      .map(([filterType, filterValues]) =>
        filterValues.length > 0
          ? `${filterType}:${filterValues.map((f) => f.slug).join('-')}`
          : '',
      )
      .filter((s) => s !== '');

    return `/products/${segments.join('/')}`;
  },

  resetFilters: () => set({ filters: {} }),
}));

export default useFilterStore;
