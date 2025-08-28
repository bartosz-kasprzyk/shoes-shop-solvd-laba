import { render, screen } from '@testing-library/react';
import SummaryLine from '../SummaryLine';

describe('SummaryLine', () => {
  it('renders the label and formatted value correctly', () => {
    const mockLabel = 'Subtotal';
    const mockValue = '123.45';

    render(<SummaryLine label={mockLabel} value={mockValue} />);
    expect(screen.getByText(mockLabel)).toBeInTheDocument();
    expect(screen.getByText(`$${mockValue}`)).toBeInTheDocument();
  });
});
