import { render, screen } from '@testing-library/react';
import TotalSection from '../TotalSection';

describe('TotalSection', () => {
  it('renders the static "Total" label and the formatted total value', () => {
    const mockTotal = '850.75';

    render(<TotalSection total={mockTotal} />);
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText(`$${mockTotal}`)).toBeInTheDocument();
  });
});
