describe('Forgot Password Flow', () => {
  it('allows user to request a password reset', () => {
    const testEmail = 'testuser@example.com';

    cy.visit('/sign-in');

    cy.contains('Forgot password?').click();

    cy.url().should('include', '/forgot-password');

    cy.get('input[name="email"]').type(testEmail);
    cy.get('button[type="submit"]').click();

    cy.contains('Email sent. Check your inbox!').should('be.visible');
  });
});
