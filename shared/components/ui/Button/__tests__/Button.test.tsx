import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from '..';

describe('CustomButton', () => {
  it('renders with default props', () => {
    render(<CustomButton>Click me</CustomButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  //   it('applies the correct variant and size classes', () => {
  //     render(
  //       <CustomButton variant='secondary' size='large'>
  //         Click me
  //       </CustomButton>,
  //     );
  //     const button = screen.getByRole('button', { name: /click me/i });
  //   });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<CustomButton onClick={handleClick}>Click me</CustomButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not calls onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <CustomButton onClick={handleClick} disabled>
        Click me
      </CustomButton>,
    );
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('accepts custom className', () => {
    render(<CustomButton className='custom-class'>With Class</CustomButton>);
    const button = screen.getByRole('button', { name: /with class/i });
    expect(button).toHaveClass('custom-class');
  });
});
