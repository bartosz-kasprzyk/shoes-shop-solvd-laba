import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SizeDisplayCheckbox from '..';

describe('SizeDisplayCheckbox', () => {
  const size = { value: '42', label: '42' };
  const mockSetSelectedSizes = jest.fn();

  it('renders with correct label', () => {
    render(
      <SizeDisplayCheckbox
        size={size}
        isChecked={false}
        setSelectedSizes={mockSetSelectedSizes}
      />,
    );

    expect(screen.getByRole('button', { name: /EU-42/i })).toBeInTheDocument();
  });

  it('applies checked styles when isChecked=true', () => {
    render(
      <SizeDisplayCheckbox
        size={size}
        isChecked={true}
        setSelectedSizes={mockSetSelectedSizes}
      />,
    );

    const button = screen.getByRole('button', { name: /EU-42/i });

    expect(button).toHaveStyle('border-color: #FE645E');
    expect(button).toHaveStyle('background-color: #ffe6e6');
  });

  it('removes size when clicked and already checked', () => {
    render(
      <SizeDisplayCheckbox
        size={size}
        isChecked={true}
        setSelectedSizes={mockSetSelectedSizes}
      />,
    );

    const button = screen.getByRole('button', { name: /EU-42/i });
    fireEvent.click(button);

    expect(mockSetSelectedSizes).toHaveBeenCalledWith(expect.any(Function));

    const updaterFn = mockSetSelectedSizes.mock.calls[0][0];
    const newState = updaterFn(['42', '43']);
    expect(newState).toEqual(['43']);
  });

  it('adds size when clicked and not checked', () => {
    render(
      <SizeDisplayCheckbox
        size={size}
        isChecked={false}
        setSelectedSizes={mockSetSelectedSizes}
      />,
    );

    const button = screen.getByRole('button', { name: /EU-42/i });
    fireEvent.click(button);

    expect(mockSetSelectedSizes).toHaveBeenCalledWith(expect.any(Function));

    const updaterFn = mockSetSelectedSizes.mock.calls[0][0];
    const newState = updaterFn(['41']);
    expect(newState).toEqual(['41', '42']);
  });
});
