/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// eslint-disable-next-line no-undef
Cypress.Commands.add("login", () => {
	cy.task("setupDB");
	cy.request("POST", "http://localhost:8000/api/v1/auth/pre-register", { name: Cypress.env("name"), email: Cypress.env("email"), password: Cypress.env("password"), type: "test" })
		.its("body")
		.then(response => {
			const authToken = response.token;
			if (authToken) {
				cy.visit(`/auth/account-activate/${authToken}`);
			}
		});

	//Now at home page
	cy.wait(1000);
	cy.contains("Log out").click();

	// try to log in with wrong password
	cy.contains("Login/Register").click();

	//Fill required form fields
	cy.get("#email").click();
	cy.get("#email").type("hussain.msh67@yahoo.com");
	cy.get("#password").type("123123");
	cy.get('[data-cy="login-signup-btn"]').click();
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
