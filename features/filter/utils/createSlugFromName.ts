import type { ApiItem } from '@/shared/interfaces/ApiItem';
import { FilterValue } from '../types';

export function createSlugFromName(name: string): string {
  return ('' + name).toLowerCase().replace(/\s+/g, '_');
}
