describe('Sign-up Flow', () => {
  // skipped due to untestable email confirmation
  it.skip('allows the test user to sign up', () => {
    cy.fixture('users').then((users) => {
      const user = users.testUser;

      cy.visit('/sign-up');

      cy.get('input[name="name"]').type(user.name);
      cy.get('input[name="email"]').type(user.email);
      cy.get('input[name="password"]').type(user.password);
      cy.get('input[name="confirmPassword"]').type(user.password);
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/sign-in');
    });
  });
});
