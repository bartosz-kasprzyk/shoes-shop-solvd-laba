import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ProfilePage from '@/app/(main)/(protected)/profile/page';

describe('ProfilePage', () => {
  it('renders heading only', () => {
    render(<ProfilePage />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
