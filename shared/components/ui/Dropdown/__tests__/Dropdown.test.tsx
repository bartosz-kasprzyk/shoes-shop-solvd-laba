import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '..';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

describe('Dropdown', () => {
  it('renders the label and selected value', () => {
    render(
      <Dropdown
        id='test-dropdown'
        title='Test Dropdown'
        value='option1'
        onChange={() => jest.fn()}
        options={options}
        error={false}
        helperText=''
      />,
    );

    expect(screen.getByText('Test Dropdown')).toBeInTheDocument();

    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveTextContent('Option 1');
  });

  it('calls onChange when a different option is selected', () => {
    const handleChange = jest.fn();

    render(
      <Dropdown
        id='test-dropdown'
        title='Test Dropdown'
        value='option1'
        onChange={handleChange}
        options={options}
        error={false}
        helperText=''
      />,
    );

    fireEvent.mouseDown(screen.getByRole('combobox'));

    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error and helper text when error is true', () => {
    render(
      <Dropdown
        id='test-dropdown'
        title='Test Dropdown'
        value='option1'
        onChange={jest.fn()}
        options={options}
        error={true}
        helperText='This is an error'
      />,
    );

    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });
});
