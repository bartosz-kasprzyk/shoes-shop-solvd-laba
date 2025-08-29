import { usePathname } from 'next/navigation';
import type { Filter, FilterType } from '../types';

export function useFiltersSlugsFromPath(): Filter {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const filtersSlugs: Filter = {};

  segments.forEach((segment) => {
    const [rawKey, rawValue] = segment.split(':');
    if (!rawKey || !rawValue) return;
    const values = decodeURIComponent(rawValue).split('-');
    const key = rawKey as FilterType;
    values.forEach((value) => {
      if (!filtersSlugs[key]) filtersSlugs[key] = [{ slug: value }];
      else if (filtersSlugs[key]) filtersSlugs[key].push({ slug: value });
    });
  });
  if (filtersSlugs.search)
    filtersSlugs.search = [
      { slug: filtersSlugs.search?.map((s) => s.slug).join('-') },
    ];
  return filtersSlugs;
}
