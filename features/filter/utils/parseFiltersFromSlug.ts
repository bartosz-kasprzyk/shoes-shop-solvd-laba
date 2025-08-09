import type { FiltersState } from '../types/FiltersState';

export async function parseFiltersFromSlug(
  slugParts: string[] = [],
): Promise<FiltersState> {
  const defaultState: FiltersState = {
    Gender: [],
    Brand: [],
    Color: [],
    Size: [],
    Price: { range: [0, 1], set: false },
    searchTerm: '',
    category: '',
  };

  const filters = { ...defaultState };

  for (const part of slugParts) {
    const [key, rawValue] = decodeURIComponent(part).split(':');
    if (!key || !rawValue) continue;

    const value = decodeURIComponent(rawValue);
    switch (key.toLowerCase()) {
      case 'gender':
        filters.Gender = value.split('-');
        break;
      case 'brand':
        filters.Brand = value.split('-');
        break;
      case 'color':
        filters.Color = value.split('-');
        break;
      case 'size':
        filters.Size = value.split('-');
        break;
      case 'price': {
        const [minStr, maxStr] = value.split('-');
        const min = Number(minStr);
        const max = Number(maxStr);
        filters.Price = {
          range: [Number.isNaN(min) ? 0 : min, Number.isNaN(max) ? 1 : max],
          set: true,
        };
        break;
      }
      case 'category':
        filters.category = value;
        break;
      case 'search':
        filters.searchTerm = value;
        break;
      default:
        break;
    }
  }

  return filters;
}
