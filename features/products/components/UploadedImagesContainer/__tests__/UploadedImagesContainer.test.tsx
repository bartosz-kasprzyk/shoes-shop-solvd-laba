import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UploadedImagesContainer from '..';
import '@testing-library/jest-dom';
import imageCompression from 'browser-image-compression';
import type { UploadeImageInputProps } from '@/features/products/types';

jest.mock('browser-image-compression', () => jest.fn());

jest.mock('../../UploadImageInput', () => {
  const MockUploadImageInput = ({ handleAddImage }: UploadeImageInputProps) => (
    <div>
      <input
        type='file'
        data-testid='file-input'
        multiple
        onChange={handleAddImage}
      />
      <button>Mock Upload Input</button>
    </div>
  );
  return MockUploadImageInput;
});

jest.mock('../../UploadedImageCard', () => {
  const MockUploadedImageCard = ({
    idx,
    preview,
    deleteImage,
  }: {
    idx: number;
    preview: string;
    deleteImage: (idx: number) => void;
  }) => (
    <div key={`image-card-${idx}`} data-testid={`image-${idx}`}>
      <img src={preview} alt={`Image ${idx}`} />
      <button onClick={() => deleteImage(idx)}>Delete</button>
    </div>
  );
  return MockUploadedImageCard;
});

describe('UploadedImagesContainer', () => {
  const mockSetImages = jest.fn();
  const mockSetImagesError = jest.fn();

  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(
      (file: File) => `mock-url-${file.name}`,
    );
    (imageCompression as unknown as jest.Mock).mockImplementation((file) =>
      Promise.resolve(file),
    );
  });

  it('renders and shows input/button', () => {
    render(
      <UploadedImagesContainer
        images={[]}
        setImages={mockSetImages}
        setImagesError={mockSetImagesError}
        imagesError=''
      />,
    );

    expect(screen.getByText(/product images/i)).toBeInTheDocument();
    expect(screen.getByText(/mock upload input/i)).toBeInTheDocument();
  });

  it('calls compressAndAddImages when handleAddImage is triggered', async () => {
    render(
      <UploadedImagesContainer
        images={[]}
        setImages={mockSetImages}
        setImagesError={mockSetImagesError}
        imagesError=''
      />,
    );

    const input = screen.getByTestId('file-input');
    const file = new File(['dummy'], 'test.jpg');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockSetImages).toHaveBeenCalled();
      expect(mockSetImagesError).toHaveBeenCalledWith('');
    });
  });

  it('calls deleteImage when delete button is clicked', () => {
    render(
      <UploadedImagesContainer
        images={[{ preview: 'img1', file: new File([], 'img1.png') }]}
        setImages={mockSetImages}
        setImagesError={mockSetImagesError}
        imagesError=''
      />,
    );

    const deleteButton = screen.getByText(/delete/i);
    fireEvent.click(deleteButton);

    expect(mockSetImages).toHaveBeenCalled();
  });

  it('shows error if max images exceeded', async () => {
    render(
      <UploadedImagesContainer
        images={Array.from({ length: 6 }, (_, i) => ({
          preview: `img-${i}`,
          file: new File([], `img-${i}.png`),
        }))}
        setImages={mockSetImages}
        setImagesError={mockSetImagesError}
        imagesError=''
      />,
    );

    const input = screen.getByTestId('file-input');
    const files = [new File(['a'], '1.png'), new File(['b'], '2.png')];

    fireEvent.change(input, { target: { files } });

    await waitFor(() => {
      expect(mockSetImagesError).toHaveBeenCalledWith(
        'You can only upload up to 7 images.',
      );

      expect(mockSetImages).not.toHaveBeenCalled();
    });
  });

  it('hides the upload input when the max number of images is reached', () => {
    render(
      <UploadedImagesContainer
        images={Array.from({ length: 7 }, (_, i) => ({
          preview: `mock-url-${i}`,
          file: new File([], `img-${i}.png`),
        }))}
        setImages={mockSetImages}
        setImagesError={mockSetImagesError}
        imagesError=''
      />,
    );

    expect(screen.queryByText(/mock upload input/i)).not.toBeInTheDocument();
  });

  it('displays the imagesError message when provided', () => {
    const errorMessage = 'You can only upload up to 7 images.';
    render(
      <UploadedImagesContainer
        images={[]}
        setImages={mockSetImages}
        setImagesError={mockSetImagesError}
        imagesError={errorMessage}
      />,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
