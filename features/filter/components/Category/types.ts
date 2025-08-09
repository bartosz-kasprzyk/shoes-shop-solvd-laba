import type { FilterCategory } from '../../types/FilterCategory';

export type CategoryProps = {
  filtersCount?: number;
  additionalText?: string;
  filters: Record<string, any>;
  categoryName: FilterCategory;
  selected: string[];
  onToggle: (name: string) => void;
};
