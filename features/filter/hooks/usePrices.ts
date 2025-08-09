import { useQuery } from '@tanstack/react-query';

import { fetchPrices } from '../api/fetchPrices';

export const usePrices = () => {
  return useQuery({
    queryKey: ['prices'],
    queryFn: () => fetchPrices(),
  });
};
