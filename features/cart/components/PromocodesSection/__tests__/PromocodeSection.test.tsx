import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PromocodeSection from '..';
import type { promocode } from '../interface';
import { validPromocodes } from '../consts';

describe('PromocodeSection', () => {
  let promocodes: promocode[] = [];
  const setPromocodes = jest.fn((value) => {
    promocodes = value;
  });
  const handleDeletePromocode = jest.fn();

  beforeEach(() => {
    promocodes = [];
  });

  const openPromocodeSection = () => {
    const toggle = screen.getByText(/Do you have a promocode?/i);
    fireEvent.click(toggle);
  };

  const renderComponent = (currentPromocodes: promocode[]) => {
    render(
      <PromocodeSection
        promocodes={currentPromocodes}
        setPromocodes={setPromocodes}
        validPromocodes={validPromocodes}
        handleDeletePromocode={handleDeletePromocode}
      />,
    );
  };

  it('renders the toggle text and allows opening/closing', async () => {
    renderComponent(promocodes);

    const toggle = screen.getByText(/Do you have a promocode?/i);
    expect(toggle).toBeInTheDocument();

    fireEvent.click(toggle);
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    fireEvent.click(toggle);
    await waitFor(() => {
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
  });

  it('applies a valid promocode', () => {
    renderComponent(promocodes);

    openPromocodeSection();

    const textbox = screen.getByRole('textbox');
    fireEvent.change(textbox, {
      target: { value: 'savingMoney' },
    });
    fireEvent.click(screen.getByText(/Apply/i));

    expect(setPromocodes).toHaveBeenCalledWith([validPromocodes[0]]);
  });

  it('shows error for invalid promocode', async () => {
    renderComponent(promocodes);

    openPromocodeSection();

    const textbox = screen.getByRole('textbox');
    fireEvent.change(textbox, {
      target: { value: 'INVALID' },
    });
    fireEvent.click(screen.getByText(/Apply/i));

    await waitFor(() => {
      expect(screen.getByText(/Invalid promocode/i)).toBeInTheDocument();
    });
  });

  it('prevents applying multiple promocodes', async () => {
    promocodes = [validPromocodes[0]];
    renderComponent(promocodes);

    openPromocodeSection();

    const textbox = screen.getByRole('textbox');
    fireEvent.change(textbox, {
      target: { value: 'huntingPromos' },
    });
    fireEvent.click(screen.getByText(/Apply/i));

    await waitFor(() => {
      expect(
        screen.getByText(/You can only apply one promocode at a time/i),
      ).toBeInTheDocument();
    });

    expect(setPromocodes).not.toHaveBeenCalledWith([validPromocodes[1]]);
  });
});
