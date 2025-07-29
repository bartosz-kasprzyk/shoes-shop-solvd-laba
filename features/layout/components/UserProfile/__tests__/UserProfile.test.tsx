import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from '..';

describe('UserProfile', () => {
  it('renders avatar image and user name', () => {
    const user = {
      name: 'Alice',
      avatar: 'https://example.com/avatar.jpg',
    };

    render(<UserProfile user={user} />);

    const avatarImg = screen.getByRole('img', { name: /alice/i });
    expect(avatarImg).toHaveAttribute('src', user.avatar);

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();

    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it('renders fallback avatar initial and default name', () => {
    const user = {
      name: '',
      avatar: '',
    };

    render(<UserProfile user={user} />);

    const avatarInitial = screen.getByText('U');
    expect(avatarInitial).toBeInTheDocument();

    expect(screen.getByText('Jane Meldrum')).toBeInTheDocument();
  });

  it('renders first letter of name if no avatar', () => {
    const user = {
      name: 'Bob',
      avatar: '',
    };

    render(<UserProfile user={user} />);

    const avatarInitial = screen.getByText('B');
    expect(avatarInitial).toBeInTheDocument();

    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('renders default values when user is undefined', () => {
    render(<UserProfile user={undefined as any} />);

    expect(screen.getByText('U')).toBeInTheDocument();
    expect(screen.getByText('Jane Meldrum')).toBeInTheDocument();
  });
});
