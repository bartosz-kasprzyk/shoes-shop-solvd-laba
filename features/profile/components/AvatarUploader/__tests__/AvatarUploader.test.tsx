import { render, screen, fireEvent } from '@testing-library/react';
import AvatarUploader from '..';
import '@testing-library/jest-dom';

jest.mock('@/shared/hooks/useServerSession', () => ({
  useServerSession: jest.fn(() => ({ user: { name: 'User' } })),
}));

describe('AvatarUploader', () => {
  const mockOnFileChange = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => 'http://localhost/mock-url');
  });

  it('renders with avatarUrl when no avatarFile is provided', () => {
    const avatarUrl = 'https://example.com/avatar.png';

    render(
      <AvatarUploader
        avatarUrl={avatarUrl}
        onFileChange={mockOnFileChange}
        onDelete={mockOnDelete}
      />,
    );

    const img = screen.getByAltText('User') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', avatarUrl);
  });

  it('renders with avatarFile when provided', () => {
    const file = new File(['dummy'], 'avatar.png', { type: 'image/png' });

    render(
      <AvatarUploader
        avatarFile={file}
        onFileChange={mockOnFileChange}
        onDelete={mockOnDelete}
      />,
    );

    const img = screen.getByAltText('User') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('mock-url'));
  });

  it('calls file input click when clicking "Change photo"', () => {
    render(
      <AvatarUploader
        avatarUrl='https://example.com/avatar.png'
        onFileChange={mockOnFileChange}
        onDelete={mockOnDelete}
      />,
    );

    const fileInput = screen.getByTestId('file-input');
    const clickSpy = jest.spyOn(fileInput, 'click');

    const changeButton = screen.getByRole('button', { name: /change photo/i });
    fireEvent.click(changeButton);

    expect(clickSpy).toHaveBeenCalled();
  });

  it('calls onFileChange when file is selected', () => {
    render(
      <AvatarUploader
        avatarUrl='https://example.com/avatar.png'
        onFileChange={mockOnFileChange}
        onDelete={mockOnDelete}
      />,
    );

    const file = new File(['dummy'], 'avatar.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('file-input');

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockOnFileChange).toHaveBeenCalledWith(file);
  });

  it('calls onDelete when clicking "Delete"', () => {
    render(
      <AvatarUploader
        avatarUrl='https://example.com/avatar.png'
        onFileChange={mockOnFileChange}
        onDelete={mockOnDelete}
      />,
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalled();
  });
});
