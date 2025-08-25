jest.mock('../products');
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

import { updateProductAction } from '../updateProducts';
import { updateProduct } from '../products';
import { revalidatePath } from 'next/cache';

describe('updateProductAction', () => {
  it('calls updateProduct and revalidate the correct paths', async () => {
    const mockProductData = {
      productID: 101,
      token: 'mock-token',
      name: 'Test Product',
      price: 10,
      description: 'A test product.',
      color: '1',
      gender: '1',
      brand: '1',
      categories: '1',
      sizes: ['1'],
      images: [],
      userID: 123,
      teamName: 'Team Test',
    };

    const mockUpdateResponse = {
      id: 101,
      attributes: {
        ...mockProductData,
      },
    };
    (updateProduct as jest.Mock).mockResolvedValue(mockUpdateResponse);

    const result = await updateProductAction(mockProductData);

    expect(updateProduct).toHaveBeenCalledWith(mockProductData);

    expect(revalidatePath).toHaveBeenCalledTimes(2);
    expect(revalidatePath).toHaveBeenCalledWith('/products');
    expect(revalidatePath).toHaveBeenCalledWith(`/product/101`);

    expect(result).toEqual(mockUpdateResponse);
  });
});
