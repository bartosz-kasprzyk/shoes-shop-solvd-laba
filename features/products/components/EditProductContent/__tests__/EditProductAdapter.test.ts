import type { ProductFromServer } from '@/features/products/types/shared.interface';
import { adaptProductForEdit } from '../EditProduct.adapter';

describe('adaptProductForEdit', () => {
  it('correctly adapts product data when all fields are present', () => {
    const mockProductFromServer: ProductFromServer = {
      id: 123,
      attributes: {
        name: 'Classic Sneaker',
        price: 99.99,
        description: 'A comfortable and stylish everyday sneaker.',
        brand: { data: { id: 1, attributes: { name: 'Nike' } } },
        categories: { data: [{ id: 10, attributes: { name: 'Shoes' } }] },
        color: { data: { id: 2, attributes: { name: 'Red' } } },
        gender: { data: { id: 3, attributes: { name: 'Men' } } },
        sizes: {
          data: [
            { id: 40, attributes: { value: 38 } },
            { id: 41, attributes: { value: 39 } },
          ],
        },
        images: {
          data: [
            { id: 1001, attributes: { url: '/img/shoe-red-front.jpg' } },
            { id: 1002, attributes: { url: '/img/shoe-red-side.jpg' } },
          ],
        },
        userID: 'user123',
        teamName: 'TeamA',
      },
    };

    const expectedAdaptedProduct = {
      id: 123,
      name: 'Classic Sneaker',
      price: 99.99,
      description: 'A comfortable and stylish everyday sneaker.',
      color: '2',
      gender: '3',
      brand: '1',
      categories: '10',
      sizes: ['40', '41'],
      images: [
        { id: 1001, preview: '/img/shoe-red-front.jpg' },
        { id: 1002, preview: '/img/shoe-red-side.jpg' },
      ],
    };

    expect(adaptProductForEdit(mockProductFromServer)).toEqual(
      expectedAdaptedProduct,
    );
  });

  it('handles empty images data', () => {
    const mockProductFromServer: ProductFromServer = {
      id: 126,
      attributes: {
        name: 'Running Shoe',
        price: 80.0,
        description: 'For your daily runs.',
        brand: { data: { id: 1, attributes: { name: 'Adidas' } } },
        categories: { data: [{ id: 13, attributes: { name: 'Sport' } }] },
        color: { data: { id: 14, attributes: { name: 'Blue' } } },
        gender: { data: { id: 15, attributes: { name: 'Men' } } },
        sizes: { data: [{ id: 60, attributes: { value: 42 } }] },
        images: { data: [] },
        userID: 'user126',
        teamName: 'TeamD',
      },
    };

    const expectedAdaptedProduct = {
      id: 126,
      name: 'Running Shoe',
      price: 80.0,
      description: 'For your daily runs.',
      color: '14',
      gender: '15',
      brand: '1',
      categories: '13',
      sizes: ['60'],
      images: [],
    };

    expect(adaptProductForEdit(mockProductFromServer)).toEqual(
      expectedAdaptedProduct,
    );
  });
});
