import type { FilterValue } from '../types';

export default function mergeFilterValues(
  urlValues: FilterValue[],
  apiValues: FilterValue[],
): FilterValue[] {
  return urlValues
    .map((uv) => apiValues.find((av) => av.slug === uv.slug))
    .filter((v): v is FilterValue => v !== undefined);
}
