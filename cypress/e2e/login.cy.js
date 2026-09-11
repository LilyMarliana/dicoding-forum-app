/**
 * skenario pengujian login page
 *
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is not registered
 *   - should display alert when password is wrong
 *   - should be able to login with registered account and redirect to home page
 */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button').contains('Login').should('be.visible');
  });

  it('should display alert when email is not registered', () => {
    cy.get('input[type="email"]').type('emailtidakterdaftar@mail.com');
    cy.get('input[type="password"]').type('sembarangpassword');

    cy.on('window:alert', (text) => {
      expect(text).to.be.a('string');
    });

    cy.get('button').contains('Login').click();
  });

  it('should display alert when password is wrong', () => {
    cy.env(['TEST_EMAIL']).then(({TEST_EMAIL}) => {
      cy.get('input[type="email"]').type(TEST_EMAIL);
      cy.get('input[type="password"]').type('passwordsalah123');

      cy.on('window:alert', (text) => {
        expect(text).to.be.a('string');
      });

      cy.get('button').contains('Login').click();
    });
  });

  it('should be able to login with registered account and redirect to home page', () => {
    cy.env(['TEST_EMAIL', 'TEST_PASSWORD']).then(({TEST_EMAIL, TEST_PASSWORD}) => {
      cy.get('input[type="email"]').type(TEST_EMAIL);
      cy.get('input[type="password"]').type(TEST_PASSWORD);
      cy.get('button').contains('Login').click();

      cy.location('pathname', {timeout: 10000}).should('eq', '/');
    });
  });
});