import type {
  CreateProductDataProps,
  FetchMyProductsResponse,
  ProductResponseProps,
  DeleteProductResponse,
} from '@/features/products/types';
import type { AllOptionsProps, OptionItem } from '@/shared/types';

export async function fetchAllOptions(): Promise<AllOptionsProps> {
  const keys = ['colors', 'genders', 'brands', 'categories', 'sizes'];

  const responses = await Promise.all(keys.map((key) => fetchOptions(key)));

  return {
    colors: responses[0],
    genders: responses[1],
    brands: responses[2],
    categories: responses[3],
    sizes: responses[4],
  };
}

export async function fetchOptions(
  optionEndpoint: string,
): Promise<OptionItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${optionEndpoint}`,
    {
      headers: { Accept: 'application/json' },
    },
  );
  const json = await res.json();

  return json.data.map((item: any) => {
    const attribute =
      optionEndpoint === 'sizes' ? item.attributes.value : item.attributes.name;

    return {
      value: String(item.id),
      label: attribute,
    };
  });
}

export async function createProduct(
  data: CreateProductDataProps,
): Promise<ProductResponseProps> {
  const { token, ...productData } = data;
  const imageIDs: number[] = [];

  for (const img of data.images) {
    const id = await uploadImageToServer(img.file, token);
    imageIDs.push(id);
  }

  const productPayload = {
    ...productData,
    images: imageIDs,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: productPayload }),
    },
  );
  if (!res.ok) {
    throw new Error('Failed to add product');
  }

  const json = await res.json();

  return {
    id: json.data.id,
    ...json.data.attributes,
  };
}

export async function updateProduct(
  data: CreateProductDataProps,
): Promise<ProductResponseProps> {
  const { token, productID, ...productData } = data;
  const imageIDs: number[] = [];

  for (const img of data.images) {
    if (img.file) {
      const id = await uploadImageToServer(img.file, token);
      imageIDs.push(id);
    }
    if (img.id) {
      imageIDs.push(img.id);
    }
  }

  const productPayload = {
    ...productData,
    images: imageIDs,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${productID}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: productPayload }),
    },
  );
  if (!res.ok) {
    throw new Error('Failed to update product');
  }

  const json = await res.json();

  return {
    id: json.data.id,
    ...json.data.attributes,
  };
}

export async function uploadImageToServer(
  file: File,
  token: string,
): Promise<number> {
  const formData = new FormData();
  formData.append('files', file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error('Image upload failed');

  const data = await res.json();
  return data[0].id;
}

export async function fetchMyProducts(
  token: string,
  id: number,
): Promise<FetchMyProductsResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=*&filters%5BuserID%5D[id]=${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error('Failed to add product');
  }

  return res.json();
}

export async function deleteProduct(
  id: number,
  token: string,
): Promise<DeleteProductResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error('Failed to delete product');
  }

  return res.json();
}
