import type { FilterCategory } from './FilterCategory';

export type FiltersAction =
  | { type: 'TOGGLE'; category: FilterCategory; value: string }
  | { type: 'SET_PRICE'; range: [number, number]; set: boolean }
  | { type: 'CLEAR' };
