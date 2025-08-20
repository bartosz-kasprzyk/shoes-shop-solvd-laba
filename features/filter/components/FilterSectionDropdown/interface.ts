import type { FilterType } from '../../types';

export interface FilterSectionDropdownProps {
  children: React.ReactNode;
  filterType: FilterType;
  filterCount?: number;
  additionalText?: string;
}
