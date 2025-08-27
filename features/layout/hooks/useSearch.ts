import { useQuery } from '@tanstack/react-query';
import qs from 'qs';

const fetchSuggestions = async (term: string) => {
  if (!term) return [];
  const filters: any = {};

  filters['$or'] = [
    { description: { $containsi: term } },
    { name: { $containsi: term } },
  ];

  const pagination = {
    page: Number('1'),
    pageSize: Number('3'),
  };

  filters.teamName = { $eqi: 'team-5' };
  const queryObject: any = {
    filters,
    pagination,
    fields: ['id', 'name'],
  };
  const query = qs.stringify(queryObject, {
    encodeValuesOnly: true,
    arrayFormat: 'indices',
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?${query}`,
  );
  const data = await res.json();
  return data.data;
};

export const useSearchSuggestions = (term: string) => {
  return useQuery({
    queryKey: ['suggestions', term],
    queryFn: () => fetchSuggestions(term),
    enabled: !!term,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60,
  });
};
