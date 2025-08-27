import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UploadeImageInput from '..';
import '@testing-library/jest-dom';

jest.mock('@/shared/icons/ImageDropIcon', () => {
  const MockImageDropIcon = () => <div data-testid='mock-image-drop-icon' />;
  MockImageDropIcon.displayName = 'MockDropDownMenu';
  return MockImageDropIcon;
});

describe('UploadeImageInput', () => {
  const mockHandleAddImage = jest.fn();

  it('renders the instructional text, button, and icon', () => {
    render(<UploadeImageInput handleAddImage={mockHandleAddImage} />);

    expect(screen.getByTestId('mock-image-drop-icon')).toBeInTheDocument();

    expect(
      screen.getByText(/drop your image here, or select/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /click to browse/i }),
    ).toBeInTheDocument();
  });

  it('triggers the hidden file input when the dropzone is clicked', () => {
    const { container } = render(
      <UploadeImageInput handleAddImage={mockHandleAddImage} />,
    );

    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    expect(fileInput).toBeInTheDocument();

    const fileInputClickSpy = jest
      .spyOn(fileInput, 'click')
      .mockImplementation();

    const dropzone = screen.getByText(/drop your image here/i);
    fireEvent.click(dropzone);

    expect(fileInputClickSpy).toHaveBeenCalledTimes(1);

    fileInputClickSpy.mockRestore();
  });

  it('calls handleAddImage when files are selected', () => {
    const { container } = render(
      <UploadeImageInput handleAddImage={mockHandleAddImage} />,
    );

    const fileInput = container.querySelector('input[type="file"]');

    const testFile = new File(['why'], 'why.png', {
      type: 'image/png',
    });

    fireEvent.change(fileInput!, {
      target: { files: [testFile] },
    });

    expect(mockHandleAddImage).toHaveBeenCalledTimes(1);
    expect(mockHandleAddImage).toHaveBeenCalledWith(expect.any(Object));
  });
});
