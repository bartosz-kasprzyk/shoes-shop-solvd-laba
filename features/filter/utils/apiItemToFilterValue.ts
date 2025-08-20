import type { ApiItem } from '@/shared/interfaces/ApiItem';
import type { FilterValue } from '../types';
import { createSlugFromName } from './createSlugFromName';

export function apiItemToFilterValue(item: ApiItem): FilterValue {
  return {
    id: item.id,
    slug: createSlugFromName(
      item.attributes.value ?? item.attributes.name ?? '',
    ),
    name: item.attributes.value ?? item.attributes.name ?? '',
  };
}
