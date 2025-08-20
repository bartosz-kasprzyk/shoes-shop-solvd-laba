export type FilterType =
  | 'gender'
  | 'brand'
  | 'color'
  | 'size'
  | 'price'
  | 'category'
  | 'search';

export type FilterTypeUrlSegment =
  | 'genders'
  | 'brands'
  | 'colors'
  | 'sizes'
  | 'prices'
  | 'categories';

export type FilterValue = { id?: number; slug: string; name?: string };
export type Filter = Partial<Record<FilterType, FilterValue[]>>;
