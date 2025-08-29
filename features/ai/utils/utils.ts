import z from 'zod';

export function extractEnumValues(arr: { slug: string }[]) {
  return arr.map((item) => item.slug) as [string, ...string[]];
}

export function safeEnum(values: { slug: string }[] | undefined) {
  if (!values || values.length === 0) {
    return z.string();
  }
  return z.enum(extractEnumValues(values));
}

export function buildFilterSchemas(filters: any) {
  return z.object({
    gender: z.array(safeEnum(filters.gender)).optional(),
    brand: z.array(safeEnum(filters.brand)).optional(),
    color: z.array(safeEnum(filters.color)).optional(),
    size: z.array(safeEnum(filters.size)).optional(),
    category: z.array(safeEnum(filters.category)).optional(),
    message: z.string().describe(
      `A friendly system response to the user.  
       - If some requested filters (brand, size, color, etc.) are unavailable, politely inform the user and suggest alternatives.  
       - If all requested filters are available, provide a concise confirmation or summary of the available options.`,
    ),
  });
}

export function applyFilters(filters: Partial<Record<string, string[]>>) {
  const segments: string[] = Object.keys(filters)
    .sort((a, b) => a.localeCompare(b))
    .map((filterType) => {
      const filterSlugs = filters[filterType] || [];
      if (!Array.isArray(filterSlugs) || filterSlugs.length === 0) return '';

      const sortedSlugs = filterSlugs
        .slice()
        .sort((a, b) => a.localeCompare(b));
      return `${filterType}:${sortedSlugs.join('-')}`;
    })
    .filter(Boolean);

  return `/products/${segments.join('/')}`;
}
