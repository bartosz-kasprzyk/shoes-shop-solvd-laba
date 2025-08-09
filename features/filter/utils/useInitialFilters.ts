import { usePathname } from 'next/navigation';
import type { FiltersState } from '../types/FiltersState';

export function useInitialFilters(): FiltersState {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const defaultState: FiltersState = {
    Gender: [],
    Brand: [],
    Color: [],
    Size: [],
    Price: { range: [0, 1], set: false },
    searchTerm: '',
    category: '',
  };

  const state: FiltersState = { ...defaultState };

  segments.forEach((segment) => {
    const [key, rawValue] = segment.split(':');
    if (!key || !rawValue) return;

    const value = decodeURIComponent(rawValue);

    switch (key.toLowerCase()) {
      case 'gender':
        state.Gender = value.split('-');
        break;
      case 'brand':
        state.Brand = value.split('_').join(' ').split('-');
        break;
      case 'color':
        state.Color = value.split('-');
        break;
      case 'size':
      case 'sizes':
        state.Size = value.split('-');
        break;
      case 'price': {
        const [minStr, maxStr] = value.split('-');
        const min = Number(minStr);
        const max = Number(maxStr);
        state.Price = {
          range: [Number.isNaN(min) ? 0 : min, Number.isNaN(max) ? 1 : max],
          set: true,
        };
        break;
      }
      case 'category':
        state.category = value;
        break;
      case 'search':
        state.searchTerm = value;
        break;
      default:
        break;
    }
  });

  return state;
}
