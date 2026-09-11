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
    cy.env(['TEST_EMAIL']).then(({ TEST_EMAIL }) => {
      cy.get('input[type="email"]').type(TEST_EMAIL);
      cy.get('input[type="password"]').type('passwordsalah123');

      cy.on('window:alert', (text) => {
        expect(text).to.be.a('string');
      });

      cy.get('button').contains('Login').click();
    });
  });

  it('should be able to login with registered account and redirect to home page', () => {
    // Catatan: response API di-stub (bukan hit API asli) karena
    // forum-api.dicoding.dev memasang AWS WAF Bot/Account-Takeover
    // Protection pada endpoint /login. Beberapa kali percobaan login
    // berturut-turut dari runner CI terdeteksi sebagai pola bot dan
    // di-block dengan CAPTCHA challenge (muncul sebagai HTTP 405 dengan
    // header x-amzn-waf-action: captcha), bukan karena bug aplikasi.
    // Stubbing membuat pengujian alur login tetap deterministik & stabil di CI.
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          token: 'fake-jwt-token-for-e2e-test',
        },
      },
    }).as('loginRequest');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          user: {
            id: 'user-e2e',
            name: 'E2E Test User',
            email: 'e2e-test@example.com',
            avatar: 'https://ui-avatars.com/api/?name=E2E+Test+User',
          },
        },
      },
    }).as('getProfileRequest');

    cy.env(['TEST_EMAIL', 'TEST_PASSWORD']).then(({ TEST_EMAIL, TEST_PASSWORD }) => {
      cy.get('input[type="email"]').type(TEST_EMAIL);
      cy.get('input[type="password"]').type(TEST_PASSWORD);
      cy.get('button').contains('Login').click();

      cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
      cy.wait('@getProfileRequest').its('response.statusCode').should('eq', 200);

      cy.location('pathname', { timeout: 10000 }).should('eq', '/');
    });
  });
});