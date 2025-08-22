import type { ProductFromServer } from '../../types/components.interface';

interface adaptProductForEditReturnProps {
  id: number;
  name: string;
  price: number | undefined;
  description: string;
  color: string;
  gender: string;
  brand: string;
  categories: string;
  sizes: string[];
  images: {
    id: number;
    preview: string;
  }[];
}

export function adaptProductForEdit(
  product: ProductFromServer,
): adaptProductForEditReturnProps {
  const adapted = {
    id: product.id,
    name: product.attributes.name,
    price: product.attributes.price ?? undefined,
    description: product.attributes.description,
    color: String(product.attributes.color.data.id),
    gender: String(product.attributes.gender.data.id),
    brand: String(product.attributes.brand.data.id),
    categories: String(product.attributes.categories.data[0].id),
    sizes: product.attributes.sizes.data.map((s) => String(s.id)),
    images: product.attributes.images.data.map(
      (i: { id: number; attributes: { url: string } }) => ({
        preview: i.attributes.url,
        id: i.id,
      }),
    ),
  };
  return adapted;
}
