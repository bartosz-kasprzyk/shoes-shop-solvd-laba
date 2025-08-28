/**
 * @jest-environment jsdom
 */

import { generateInvoicePdf } from '../generateInvoicePdf';
import type { Order } from '../../types';

jest.mock('jspdf', () => {
  return jest.fn().mockImplementation(() => ({
    setFont: jest.fn(),
    setFontSize: jest.fn(),
    setTextColor: jest.fn(),
    setFillColor: jest.fn(),
    setDrawColor: jest.fn(),
    text: jest.fn(),
    rect: jest.fn(),
    line: jest.fn(),
    splitTextToSize: jest.fn().mockReturnValue(['Mock address line']),
    save: jest.fn(),
  }));
});

describe('generateInvoicePdf', () => {
  const mockOrder: Order = {
    orderId: 'TEST-12345',
    amount: 100, // $100.00
    productsQuantity: 2,
    date: '27.08.2025',
    delivery: '123 Test St, Test City, TC 12345',
    contacts: 'John Doe, +1 234 567 8900, john.doe@example.com',
    payment: 'Card',
    products: [
      {
        id: '1',
        name: 'Test Shoe Model 1',
        price: 50, // $50.00
        quantity: 1,
        imageUrl: '/test-image.jpg',
        gender: 'unisex',
        size: '42',
      },
      {
        id: '2',
        name: 'Test Shoe Model 2',
        price: 50, // $50.00
        quantity: 1,
        imageUrl: '/test-image2.jpg',
        gender: 'men',
        size: '44',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate PDF without errors', () => {
    expect(() => {
      generateInvoicePdf(mockOrder);
    }).not.toThrow();
  });

  it('should call PDF save method with correct filename', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const jsPDF = require('jspdf');
    const mockSave = jest.fn();

    jsPDF.mockImplementation(() => ({
      setFont: jest.fn(),
      setFontSize: jest.fn(),
      setTextColor: jest.fn(),
      setFillColor: jest.fn(),
      setDrawColor: jest.fn(),
      text: jest.fn(),
      rect: jest.fn(),
      line: jest.fn(),
      splitTextToSize: jest.fn().mockReturnValue(['Mock address line']),
      save: mockSave,
    }));

    generateInvoicePdf(mockOrder);

    expect(mockSave).toHaveBeenCalledWith('invoice-TEST-12345-27082025.pdf');
  });

  it('should work with custom company info', () => {
    const customCompanyInfo = {
      name: 'Custom Shoes',
      address: '456 Custom Ave',
      city: 'Custom City, CC 67890',
      phone: '+1 987 654 3210',
      email: 'info@customshoes.com',
    };

    expect(() => {
      generateInvoicePdf(mockOrder, customCompanyInfo);
    }).not.toThrow();
  });
});
