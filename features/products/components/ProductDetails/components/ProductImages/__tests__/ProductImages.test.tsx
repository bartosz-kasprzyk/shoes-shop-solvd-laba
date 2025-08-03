import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductImages from '..';
import useMediaQuery from '@mui/material/useMediaQuery';

jest.mock('next/image', () => {
  const MockedImage = (props: any) => {
    const { alt, fill, priority, ...rest } = props;
    return <img {...rest} alt={alt} />;
  };
  MockedImage.displayName = 'NextImageMock';
  return MockedImage;
});

jest.mock('@mui/material/useMediaQuery');

const mockImages = [
  { id: 1, attributes: { url: '/img1.jpg' } },
  { id: 2, attributes: { url: '/img2.jpg' } },
  { id: 3, attributes: { url: '/img3.jpg' } },
];

describe('ProductImages component', () => {
  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockImplementation(() => false); // desktop view
  });

  test('renders all thumbnails and main image correctly', () => {
    render(<ProductImages images={mockImages} />);

    const thumbnails = screen.getAllByAltText(/Thumbnail \d+/i);
    expect(thumbnails).toHaveLength(mockImages.length);

    const mainImage = screen.getByAltText(/Main product image/i);
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', mockImages[0].attributes.url);
  });

  test('clicking a thumbnail updates the main image', () => {
    render(<ProductImages images={mockImages} />);

    let mainImages = screen.getAllByAltText('Main product image'); // 2 exist because of framer-motion
    let latestMainImage = mainImages[mainImages.length - 1];
    expect(latestMainImage).toHaveAttribute(
      'src',
      mockImages[0].attributes.url,
    );

    const nextThumbnail = screen.getByAltText('Thumbnail 1');
    fireEvent.click(nextThumbnail);

    mainImages = screen.getAllByAltText('Main product image');
    latestMainImage = mainImages[mainImages.length - 1];

    expect(latestMainImage).not.toHaveAttribute(
      'src',
      mockImages[0].attributes.url,
    );
    expect(latestMainImage).toHaveAttribute(
      'src',
      mockImages[1].attributes.url,
    );
  });

  test('next and prev buttons navigate correctly', () => {
    render(<ProductImages images={mockImages} />);

    const [prevBtn, nextBtn] = screen.getAllByRole('button');

    function getActiveImage(expectedIndex: number) {
      const mainImages = screen.getAllByAltText('Main product image');
      return mainImages.find(
        (img) =>
          img.getAttribute('src') === mockImages[expectedIndex].attributes.url,
      );
    }

    // Check initial state (image 0)
    let activeImage = getActiveImage(0);
    expect(activeImage).toBeDefined();
    expect(activeImage).toHaveAttribute('src', mockImages[0].attributes.url);
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    // Click next (to image 1)
    fireEvent.click(nextBtn);
    activeImage = getActiveImage(1);
    expect(activeImage).toBeDefined();
    expect(activeImage).toHaveAttribute('src', mockImages[1].attributes.url);
    expect(prevBtn).not.toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    // Click next (to image 2)
    fireEvent.click(nextBtn);
    activeImage = getActiveImage(2);
    expect(activeImage).toBeDefined();
    expect(activeImage).toHaveAttribute('src', mockImages[2].attributes.url);
    expect(prevBtn).not.toBeDisabled();
    expect(nextBtn).toBeDisabled();

    // Click prev (back to image 1)
    fireEvent.click(prevBtn);
    activeImage = getActiveImage(1);
    expect(activeImage).toBeDefined();
    expect(activeImage).toHaveAttribute('src', mockImages[1].attributes.url);
    expect(prevBtn).not.toBeDisabled();
    expect(nextBtn).not.toBeDisabled();
  });

  test('renders dot indicators and reacts to clicks on mobile', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => true); // mobile view
    render(<ProductImages images={mockImages} />);

    function getActiveImage(expectedIndex: number) {
      const mainImages = screen.getAllByAltText('Main product image');
      return mainImages.find(
        (img) =>
          img.getAttribute('src') === mockImages[expectedIndex].attributes.url,
      );
    }

    const dots = screen.getAllByRole('button', { name: /select image/i });
    expect(dots).toHaveLength(mockImages.length);

    let activeImage = getActiveImage(0);
    expect(activeImage).toBeDefined();
    expect(activeImage).toHaveAttribute('src', mockImages[0].attributes.url);

    fireEvent.click(dots[2]);
    activeImage = getActiveImage(2);
    expect(activeImage).toBeDefined();
    expect(activeImage).toHaveAttribute('src', mockImages[2].attributes.url);

    fireEvent.click(dots[1]);
    activeImage = getActiveImage(1);
    expect(activeImage).toBeDefined();
    expect(activeImage).toHaveAttribute('src', mockImages[1].attributes.url);
  });
});
