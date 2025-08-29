describe('Reset Password Form', () => {
  const validPassword = 'Abcdef12';
  const shortPassword = 'abc';

  beforeEach(() => {
    cy.visit('/reset-password');
  });

  it('allows setting a valid password', () => {
    cy.get('input[name="password"]').type(validPassword);
    cy.get('input[name="confirmPassword"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.contains(
      'The reset password link is invalid or has expired. Please try again.',
    ).should('be.visible');
  });

  it('shows validation error for too short password', () => {
    cy.get('input[name="password"]').type(shortPassword);
    cy.get('input[name="confirmPassword"]').type(shortPassword);
    cy.get('button[type="submit"]').click();

    cy.contains('Password must be at least 8 characters').should('be.visible');
    cy.contains('Confirm password must be at least 8 characters').should(
      'be.visible',
    );
  });
});
