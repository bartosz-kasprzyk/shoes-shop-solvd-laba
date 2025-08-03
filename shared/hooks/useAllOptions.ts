import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { fetchAllOptions } from '@/app/api/products';
import type { AllOptionsProps } from '../types';

export function useAllOptions(): UseQueryResult<AllOptionsProps> {
  return useQuery<AllOptionsProps>({
    queryKey: ['all-options'],
    queryFn: fetchAllOptions,
  });
}
