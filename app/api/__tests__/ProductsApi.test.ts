import {
  fetchOptions,
  fetchAllOptions,
  deleteProduct,
  uploadImageToServer,
  createProduct,
  updateProduct,
  fetchMyProducts,
} from '../products';

import type { ImageFile } from '@/features/products/types';

global.fetch = jest.fn();

interface FlattenedProductResponse {
  id: number;
  name: string;
  price: number;
  description: string;
  teamName: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

describe('Products API Functions', () => {
  describe('fetchOptions', () => {
    it('fetches and correctly maps options for a given endpoint', async () => {
      const mockApiResponse = {
        data: [
          { id: 1, attributes: { name: 'Red' } },
          { id: 2, attributes: { name: 'Blue' } },
        ],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => mockApiResponse,
      });

      const options = await fetchOptions('colors');

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/colors`,
        { headers: { Accept: 'application/json' } },
      );
      expect(options).toEqual([
        { value: '1', label: 'Red' },
        { value: '2', label: 'Blue' },
      ]);
    });

    it('correctly maps the "value" attribute for the "sizes" endpoint', async () => {
      const mockApiResponse = {
        data: [
          { id: 1, attributes: { value: '42' } },
          { id: 2, attributes: { value: '43' } },
        ],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => mockApiResponse,
      });

      const options = await fetchOptions('sizes');

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/sizes`,
        expect.any(Object),
      );
      expect(options).toEqual([
        { value: '1', label: '42' },
        { value: '2', label: '43' },
      ]);
    });
  });

  describe('fetchAllOptions', () => {
    it('fetchs all options concurrently and returns a structured object', async () => {
      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: () => ({
            data: [{ id: 1, attributes: { name: 'Red' } }],
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => ({
            data: [{ id: 1, attributes: { name: 'Male' } }],
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => ({
            data: [{ id: 1, attributes: { name: 'Nike' } }],
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => ({
            data: [{ id: 1, attributes: { name: 'Shoes' } }],
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => ({
            data: [{ id: 1, attributes: { value: '42' } }],
          }),
        });

      const allOptions = await fetchAllOptions();

      expect(fetch).toHaveBeenCalledTimes(5);
      expect(allOptions).toEqual({
        colors: [{ value: '1', label: 'Red' }],
        genders: [{ value: '1', label: 'Male' }],
        brands: [{ value: '1', label: 'Nike' }],
        categories: [{ value: '1', label: 'Shoes' }],
        sizes: [{ value: '1', label: '42' }],
      });
    });
  });

  describe('deleteProduct', () => {
    it('sends a DELETE request to the correct endpoint with auth', async () => {
      const mockResponse = { data: { id: 123 } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => mockResponse,
      });

      const result = await deleteProduct(123, 'test-token');

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/123`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer test-token`,
          },
        },
      );
      expect(result).toEqual(mockResponse);
    });

    it('throws an error if the delete request fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(deleteProduct(123, 'test-token')).rejects.toThrow(
        'Failed to delete product',
      );
    });
  });

  describe('uploadImageToServer', () => {
    it('successfully uploads an image and returns the ID', async () => {
      const mockFile = new File(['mock-content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const mockToken = 'test-token';
      const mockUploadResponse = [
        {
          id: 101,
          name: 'test.jpg',
          url: '/uploads/test.jpg',
        },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => mockUploadResponse,
      });

      const result = await uploadImageToServer(mockFile, mockToken);

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
          body: expect.any(FormData),
        }),
      );

      expect(result).toBe(101);
    });

    it('throws an error if the image upload fails', async () => {
      const mockFile = new File(['mock-content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const mockToken = 'test-token';

      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(uploadImageToServer(mockFile, mockToken)).rejects.toThrow(
        'Image upload failed',
      );
    });
  });

  describe('createProduct', () => {
    it('successfully creates a product by mocking two separate API calls', async () => {
      const productData = {
        token: 'test-token',
        name: 'Test Product',
        price: 50,
        description: 'A test product',
        color: '1',
        gender: '1',
        brand: '1',
        categories: '1',
        sizes: ['1', '2'],
        images: [
          { id: 1, file: new File(['img1'], 'img1.jpg') },
          { id: 2, file: new File(['img2'], 'img2.jpg') },
        ],
        userID: 456,
        teamName: 'Team A',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => [{ id: 101, name: 'img1.jpg' }],
      });

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => [{ id: 102, name: 'img2.jpg' }],
      });

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => ({
          data: {
            id: 123,
            attributes: {
              name: productData.name,
              price: productData.price,
              description: productData.description,
              teamName: productData.teamName,
            },
          },
        }),
      });

      const result = (await createProduct(
        productData,
      )) as unknown as FlattenedProductResponse;

      expect(fetch).toHaveBeenCalledTimes(3);

      expect(result.id).toBe(123);
      expect(result.name).toBe(productData.name);
      expect(result.price).toBe(productData.price);
      expect(result.description).toBe(productData.description);
      expect(result.teamName).toBe(productData.teamName);
    });

    it('throws an error if the product creation request fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      const productData = {
        token: 'test-token',
        name: 'Test Product',
        price: 50,
        description: 'A test product.',
        color: '1',
        gender: '1',
        brand: '1',
        categories: '1',
        sizes: ['1', '2'],
        images: [],
        userID: 456,
        teamName: 'Team A',
      };

      await expect(createProduct(productData)).rejects.toThrow(
        'Failed to add product',
      );
    });
  });

  describe('updateProduct', () => {
    it('successfully updates a product with new images', async () => {
      const productData = {
        token: 'test-token',
        productID: 123,
        name: 'Updated Product',
        price: 75,
        description: 'An updated test product',
        color: '1',
        gender: '1',
        brand: '1',
        categories: '1',
        sizes: ['1', '2'],
        images: [
          { id: 1, file: new File(['new_img_1'], 'new1.jpg') },
          { id: 2, file: new File(['new_img_2'], 'new2.jpg') },
        ],
        userID: 456,
        teamName: 'Team B',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => [{ id: 101, name: 'new1.jpg' }],
      });

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => [{ id: 102, name: 'new2.jpg' }],
      });

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => ({
          data: {
            id: 123,
            attributes: {
              name: productData.name,
              price: productData.price,
              description: productData.description,
              teamName: productData.teamName,
            },
          },
        }),
      });

      const result = (await updateProduct(
        productData,
      )) as unknown as FlattenedProductResponse;

      expect(fetch).toHaveBeenCalledTimes(3);

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${productData.productID}`,
        expect.objectContaining({
          method: 'PUT',
          body: expect.stringContaining('"images":[101,102]'),
        }),
      );

      expect(result.id).toBe(123);
      expect(result.name).toBe(productData.name);
    });

    it('successfully updates a product with a mix of new and existing images', async () => {
      const productData = {
        token: 'test-token',
        productID: 123,
        name: 'Mixed Product',
        price: 80,
        description: 'A product with mixed images',
        color: '1',
        gender: '1',
        brand: '1',
        categories: '1',
        sizes: ['1', '2'],
        images: [
          { id: 201 },
          { id: 202, file: new File(['new_img_3'], 'new3.jpg') },
        ] as ImageFile[],
        userID: 456,
        teamName: 'Team C',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => [{ id: 103, name: 'new3.jpg' }],
      });

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => ({
          data: { id: 123, attributes: { name: productData.name } },
        }),
      });

      const result = (await updateProduct(
        productData,
      )) as unknown as FlattenedProductResponse;

      expect(fetch).toHaveBeenCalledTimes(2);

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${productData.productID}`,
        expect.objectContaining({
          method: 'PUT',
          body: expect.stringContaining('"images":[201,103]'),
        }),
      );

      expect(result.id).toBe(123);
      expect(result.name).toBe(productData.name);
    });

    it('throws an error if the update request fails', async () => {
      const productData = {
        token: 'test-token',
        productID: 123,
        name: 'Failed Update',
        price: 90,
        description: 'This will fail',
        color: '1',
        gender: '1',
        brand: '1',
        categories: '1',
        sizes: ['1', '2'],
        images: [],
        userID: 456,
        teamName: 'Team D',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(updateProduct(productData)).rejects.toThrow(
        'Failed to update product',
      );
    });
  });

  describe('fetchMyProducts', () => {
    it('successfully fetches products for a given user ID', async () => {
      const mockToken = 'test-user-token';
      const mockId = 123;
      const mockApiResponse = {
        data: [
          {
            id: 1,
            attributes: {
              name: 'User Product 1',
              price: 50,
              description: 'A product by the user.',
              teamName: 'Team A',
              userID: { data: { id: mockId } },
            },
          },
        ],
        meta: {},
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => mockApiResponse,
      });

      const result = await fetchMyProducts(mockToken, mockId);

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=*&filters%5BuserID%5D[id]=${mockId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${mockToken}`,
          },
        },
      );

      expect(result).toEqual(mockApiResponse);
    });

    it('throws an error if the fetch request fails', async () => {
      const mockToken = 'test-user-token';
      const mockId = 123;

      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

      await expect(fetchMyProducts(mockToken, mockId)).rejects.toThrow(
        'Failed to add product',
      );
    });
  });
});
