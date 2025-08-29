describe('Sign-in / Authentication Flow', () => {
  it('blocks guests from visiting protected routes', () => {
    cy.visit('/my-products');

    cy.url().should('include', '/sign-in');
  });

  it('allows the test user to log in', () => {
    cy.fixture('users').then((users) => {
      const user = users.testUser;

      cy.visit('/sign-in');

      cy.intercept('POST', '/api/auth/callback/credentials').as('loginRequest');

      cy.get('input[name="email"]').type(user.email);
      cy.get('input[name="password"]').type(user.password);
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');

      cy.url().should('include', '/products');
    });
  });

  it('allows authenticated users on protected routes', () => {
    cy.fixture('users').then((users) => {
      const user = users.testUser;

      cy.visit('/sign-in');

      cy.intercept('POST', '/api/auth/callback/credentials').as('loginRequest');

      cy.get('input[name="email"]').type(user.email);
      cy.get('input[name="password"]').type(user.password);
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');

      cy.contains('Success! Redirecting...').should('not.exist');

      cy.visit('/my-products');

      cy.url().should('include', '/my-products');
    });
  });
});
