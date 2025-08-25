import { render, screen, fireEvent } from '@testing-library/react';
import UploadedImageCard from '..';

jest.mock('@/shared/components/ui', () => {
  const MockImageOverlay = ({
    children,
    onDelete,
  }: {
    children: React.ReactNode;
    onDelete: () => void;
  }) => (
    <div data-testid='mock-overlay'>
      {children} <button onClick={onDelete}>Delete</button>
    </div>
  );
  MockImageOverlay.displayName = 'MockImageOverlay';
  return { ImageOverlay: MockImageOverlay };
});

describe('UploadedImageCard', () => {
  const mockDeleteImage = jest.fn();
  const defaultProps = {
    idx: 5,
    preview: 'https://example.com/image.jpg',
    deleteImage: mockDeleteImage,
  };
  it('renders the image with the correct src and alt text', () => {
    render(<UploadedImageCard {...defaultProps} />);
    const image = screen.getByRole('img', { name: 'Image 5' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', defaultProps.preview);
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
