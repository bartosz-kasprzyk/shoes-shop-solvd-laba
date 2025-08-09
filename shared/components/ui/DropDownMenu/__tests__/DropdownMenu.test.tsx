import { render, screen, fireEvent } from '@testing-library/react';
import DropDownMenu from '..';

jest.mock('next/image', () => {
  const NextImage = (props: any) => <img {...props} />;
  NextImage.displayName = 'NextImage';
  return NextImage;
});

describe('DropDownMenu', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders icon button', () => {
    render(<DropDownMenu />);
    const iconButton = screen.getByRole('button', { name: /more icon/i });
    expect(iconButton).toBeInTheDocument();
  });

  it('opens menu on icon button click', () => {
    render(<DropDownMenu />);
    const iconButton = screen.getByRole('button', { name: /more icon/i });
    fireEvent.click(iconButton);

    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('logs action when a menu item is clicked', () => {
    render(<DropDownMenu />);
    fireEvent.click(screen.getByRole('button', { name: /more icon/i }));

    const viewItem = screen.getByText('View');
    fireEvent.click(viewItem);

    expect(console.log).toHaveBeenCalledWith('View clicked');
  });

  it('logs action when a menu item is clicked', () => {
    render(<DropDownMenu />);

    fireEvent.click(screen.getByRole('button', { name: /more icon/i }));

    const actions = ['View', 'Edit', 'Duplicate', 'Delete'];

    actions.forEach((action) => {
      const item = screen.getByText(action);
      fireEvent.click(item);
      expect(console.log).toHaveBeenCalledWith(`${action} clicked`);

      fireEvent.click(screen.getByRole('button', { name: /more icon/i }));
    });
  });
});
