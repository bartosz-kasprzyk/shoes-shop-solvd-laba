import qs from 'qs';

export const fetchPrices = async (): Promise<number[]> => {
  const filters: any = { teamName: { $eq: 'team-5' } };

  const queryMax = qs.stringify(
    {
      filters,
      sort: { price: 'desc' },
      pagination: { withCount: false, pageSize: 1 },
      fields: ['price'],
    },
    { encode: false, arrayFormat: 'brackets' },
  );

  const resMax = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?${queryMax}`,
  );
  if (!resMax.ok) throw new Error('Failed to fetch max price');
  const jsonMax = await resMax.json();
  const maxPrice = jsonMax.data[0]?.attributes?.price ?? null;

  const queryMin = qs.stringify(
    {
      filters,
      sort: { price: 'asc' },
      pagination: { withCount: false, pageSize: 1 },
      fields: ['price'],
    },
    { encode: false, arrayFormat: 'brackets' },
  );

  const resMin = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?${queryMin}`,
  );
  if (!resMin.ok) throw new Error('Failed to fetch min price');
  const jsonMin = await resMin.json();
  const minPrice = jsonMin.data[0]?.attributes?.price ?? null;

  return [maxPrice, minPrice];
};
