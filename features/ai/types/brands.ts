import { z } from 'zod';

// from your JSON
export const brands = [
  { id: 9, title: 'Nike' },
  { id: 10, title: 'Adidas' },
  { id: 11, title: 'Asics' },
  { id: 12, title: 'Puma' },
  { id: 13, title: 'New Balance' },
  { id: 14, title: 'Skechers' },
  { id: 15, title: 'Lowa' },
  { id: 16, title: 'Salomon' },
  { id: 17, title: 'Reebok' },
  { id: 18, title: 'Under Armour' },
  { id: 19, title: 'Meindl' },
  { id: 20, title: 'Hugo Boss' },
  { id: 21, title: 'Karrimor' },
] as const;

// extract titles
export const brandTitles = brands.map((b) => b.title) as [string, ...string[]];

// enum of all brand names
export const BrandEnum = z.enum(brandTitles);

// schema for one brand
export const BrandSchema = z.object({
  id: z.number(),
  title: BrandEnum,
});

// schema for array of brands
export const BrandsSchema = z.array(BrandSchema);

// type inference
export type Brand = z.infer<typeof BrandSchema>;
