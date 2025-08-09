import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SizeSelector from '..';

describe('<SizeSelector />', () => {
  const mockSetSelectedSize = jest.fn();
  const mockSetShowSizeWarning = jest.fn();

  const defaultProps = {
    availableSizes: new Set([38, 40]),
    selectedSize: null,
    setSelectedSize: mockSetSelectedSize,
    showSizeWarning: false,
    setShowSizeWarning: mockSetShowSizeWarning,
  };

  it('renders 13 size buttons', () => {
    render(<SizeSelector {...defaultProps} />);

    const allSizeButtons = screen.getAllByRole('button', { name: /EU-/i });

    expect(allSizeButtons).toHaveLength(13);
  });

  it('only available sizes are enabled', () => {
    render(<SizeSelector {...defaultProps} />);

    const allSizeButtons = screen.getAllByRole('button', { name: /EU-/i });

    const size38 = screen.getByRole('button', { name: 'EU-38' });
    const size40 = screen.getByRole('button', { name: 'EU-40' });
    expect(size38).toBeEnabled();
    expect(size40).toBeEnabled();

    const disabledButtons = allSizeButtons.filter(
      (btn) => btn !== size38 && btn !== size40,
    );
    disabledButtons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it('calls setSelectedSize and hides warning on click', () => {
    render(<SizeSelector {...defaultProps} />);

    const size40 = screen.getByRole('button', { name: 'EU-40' });
    fireEvent.click(size40);

    expect(mockSetSelectedSize).toHaveBeenCalledWith(40);
    expect(mockSetShowSizeWarning).toHaveBeenCalledWith(false);
  });

  it('displays warning message when showSizeWarning is true', () => {
    render(<SizeSelector {...defaultProps} showSizeWarning={true} />);

    const warning = screen.getByRole('alert');

    expect(warning).toBeVisible();
    expect(warning).toHaveTextContent('Please choose your size.');
  });

  it('hides warning message when showSizeWarning is false', () => {
    render(<SizeSelector {...defaultProps} showSizeWarning={false} />);

    const warning = screen.getByRole('alert');

    expect(warning).not.toBeVisible();
  });
});
