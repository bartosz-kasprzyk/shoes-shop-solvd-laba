import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductImages from '..';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { TestImageProps } from '@/shared/interfaces/Tests';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill: _fill, priority: _priority, ...rest }: TestImageProps) => (
    <img {...rest} src={rest.src} alt={rest.alt || 'fallback'} />
  ),
}));

jest.mock('@mui/material/useMediaQuery');

const mockImages = [
  { id: 1, attributes: { url: '/img1.jpg' } },
  { id: 2, attributes: { url: '/img2.jpg' } },
  { id: 3, attributes: { url: '/img3.jpg' } },
];

describe('ProductImages component', () => {
  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockImplementation(() => false);
  });

  it('renders all thumbnails and main image correctly', () => {
    render(<ProductImages images={mockImages} />);

    const thumbnails = screen.getAllByAltText(/Thumbnail \d+/i);
    expect(thumbnails).toHaveLength(mockImages.length);

    const initialMainImage = screen.getByAltText('Product image 1');
    expect(initialMainImage).toBeInTheDocument();
    expect(initialMainImage).toHaveAttribute(
      'src',
      mockImages[0].attributes.url,
    );
  });

  it('clicking a thumbnail updates the main image', () => {
    render(<ProductImages images={mockImages} />);

    const secondThumbnail = screen.getByAltText('Thumbnail 1');
    fireEvent.click(secondThumbnail);

    const newMainImage = screen.getByAltText('Product image 2');
    expect(newMainImage).toBeInTheDocument();
    expect(newMainImage).toHaveAttribute('src', mockImages[1].attributes.url);
  });

  it('next and prev buttons navigate correctly', () => {
    render(<ProductImages images={mockImages} />);

    const [prevBtn, nextBtn] = screen.getAllByRole('button');

    // Initial state: first image is active, prev button is disabled
    const initialMainImage = screen.getByAltText('Product image 1');
    expect(initialMainImage).toBeInTheDocument();
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    // Click next button
    fireEvent.click(nextBtn);
    const secondMainImage = screen.getByAltText('Product image 2');
    expect(secondMainImage).toBeInTheDocument();
    expect(prevBtn).not.toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    // Click next button again
    fireEvent.click(nextBtn);
    const thirdMainImage = screen.getByAltText('Product image 3');
    expect(thirdMainImage).toBeInTheDocument();
    expect(prevBtn).not.toBeDisabled();
    expect(nextBtn).toBeDisabled();

    // Click prev button
    fireEvent.click(prevBtn);
    const backToSecondImage = screen.getByAltText('Product image 2');
    expect(backToSecondImage).toBeInTheDocument();
    expect(prevBtn).not.toBeDisabled();
    expect(nextBtn).not.toBeDisabled();
  });
});
