import type { Filter, FilterType } from '../types';

export function filtersSlugsFromSlug(slug: string[]): Filter {
  const segments = slug ?? [];

  const filtersSlugs: Filter = {};

  segments.forEach((segment) => {
    const [rawKey, rawValue] = decodeURIComponent(segment).split(':');
    if (!rawKey || !rawValue) return;
    const values = decodeURIComponent(rawValue).split('-');
    const key = rawKey as FilterType;
    values.forEach((value) => {
      if (!filtersSlugs[key]) filtersSlugs[key] = [{ slug: value }];
      else if (filtersSlugs[key]) filtersSlugs[key].push({ slug: value });
    });
  });

  return filtersSlugs;
}
