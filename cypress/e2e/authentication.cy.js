/* eslint-disable no-undef */
describe("Authentication", () => {
	it("display login and registration form properly", () => {
		// eslint-disable-next-line no-undef
		cy.visit("/account/login-register");

		// Log in for should appear at the start
		cy.contains("LOG IN");

		// Signup form should appear when register is clicked
		cy.get('[data-cy="login-register-span"]').click();
		cy.contains("SIGN UP");
	});

	it("Shows error messages for improper inputs", () => {
		cy.visit("/account/login-register");
		cy.contains("LOG IN").click();
		cy.contains("Password field is empty");
		cy.contains("Valid email is required");
	});
});
