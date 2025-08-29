import { render, screen, fireEvent } from '@testing-library/react';
import UploadedImageCard from '..';
import type { ImageOverlayProps } from '@/shared/components/ui/ImageOverlay/interface';

jest.mock('@/shared/components/ui', () => {
  const MockImageOverlay = ({
    children,
    onDelete,
    variant,
  }: ImageOverlayProps) => (
    <div data-testid='mock-overlay'>
      {children} <button onClick={onDelete}>Delete</button>
      <span data-testid='variant'>{variant}</span>
    </div>
  );
  return { ImageOverlay: MockImageOverlay };
});

describe('UploadedImageCard', () => {
  const mockDeleteImage = jest.fn();

  const defaultProps = {
    idx: 5,
    preview: 'https://example.com/image.jpg',
    deleteImage: mockDeleteImage,
    variant: 'delete' as const,
    fileId: 42,
  };
  it('renders the image with the correct src and alt text', () => {
    render(<UploadedImageCard {...defaultProps} />);
    const image = screen.getByRole('img', { name: 'Image 5' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', defaultProps.preview);
  });

  it('passes token, variant, and fileId to ImageOverlay', () => {
    render(<UploadedImageCard {...defaultProps} />);
    expect(screen.getByTestId('variant').textContent).toBe(
      defaultProps.variant,
    );
  });
  it('calls the deleteImage function with the correct index when the delete action is triggered', () => {
    render(<UploadedImageCard {...defaultProps} />);
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);
    expect(mockDeleteImage).toHaveBeenCalledTimes(1);
    expect(mockDeleteImage).toHaveBeenCalledWith(defaultProps.idx);
  });
  it('correctly passes a different index to the deleteImage function', () => {
    render(<UploadedImageCard {...defaultProps} idx={99} />);
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);
    expect(mockDeleteImage).toHaveBeenCalledTimes(1);
    expect(mockDeleteImage).toHaveBeenCalledWith(99);
  });
});
