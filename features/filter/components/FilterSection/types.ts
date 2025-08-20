import type { FilterType } from '../../types';

export type FilterSectionProps = {
  filterType: FilterType;
  maxSelections?: number;
  Container: React.ComponentType<{ children?: React.ReactNode }>;
};
