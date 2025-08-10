export interface ImagesData {
  id: number;
  attributes: { url: string };
}

interface Images {
  data: ImagesData[];
}

interface SizeData {
  id: number;
  attributes: { value: number };
}

interface Sizes {
  data: SizeData[] | null;
}

interface ProductData {
  id: number;
  attributes: {
    name: string;
    images: Images;
    price: number;
    color: { data: { attributes: { name: string } } | null };
    sizes: Sizes;
    description: string;
  };
}

export interface ProductApiResponse {
  data: ProductData;
}
