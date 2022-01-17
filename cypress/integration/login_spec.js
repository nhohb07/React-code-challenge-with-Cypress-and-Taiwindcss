describe('Login Test', () => {
  it('Incorrect email!', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-testid="email"] > :nth-child(1) > .appearance-none').type('test@');
    cy.get('#login-btn').click();

    cy.get('[data-testid="email"] > .text-red-500').should(
      'have.text',
      'email must be a valid email',
    );
  });

  it('Incorrect password!', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-testid="password"] > :nth-child(1) > .appearance-none').type('123');
    cy.get('#login-btn').click();

    cy.get('[data-testid="password"] > .text-red-500').should(
      'have.text',
      'password must be at least 6 characters',
    );

    cy.get('[data-testid="password"] > :nth-child(1) > .appearance-none').type(
      '123123123123123123123123',
    );
    cy.get('#login-btn').click();

    cy.get('[data-testid="password"] > .text-red-500').should(
      'have.text',
      'password must be at most 20 characters',
    );
  });

  it('Empty fields!', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#login-btn').click();

    cy.get('[data-testid="email"] > .text-red-500').should(
      'have.text',
      'email is a required field',
    );

    cy.get('[data-testid="password"] > .text-red-500').should(
      'have.text',
      'password must be at least 6 characters',
    );
  });
});
