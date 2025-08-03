import type { AllOptionsProps } from '@/shared/types';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM4MiwiaWF0IjoxNzUzNjIzNDMxLCJleHAiOjE3NTYyMTU0MzF9.2cT4xiVma_uumTaCZZVYRlrVjU7Y1DmSSCemXQ92e9U';

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

export async function fetchOptions(optionEndpoint: string) {
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

export async function createProduct(data: any) {
  const imageIDs: number[] = [];

  for (const img of data.images) {
    const id = await uploadImageToServer(img.file);
    imageIDs.push(id);
  }

  const productPayload = {
    ...data,
    images: imageIDs,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`,
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

export async function uploadImageToServer(file: File): Promise<number> {
  const formData = new FormData();
  formData.append('files', file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error('Image upload failed');

  const data = await res.json();
  return data[0].id;
}
