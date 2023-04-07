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
	cy.task("setupDb");

	cy.request("POST", "http://localhost:8000/api/v1/auth/login", { email: "hussain.msh67@gmail.com", password: "123123" }).then(resp => {
		localStorage.setItem("auth", JSON.stringify(resp.body));
	});
	// cy.visit("/account/login-register");
	// try to log in with wrong password
	// cy.contains("Login/Register").click();

	//Fill required form fields
	// cy.get("#email").click();
	// cy.get("#email").type("hussain.msh67@gmail.com");
	// cy.get("#password").type("123123");
	// cy.get('[data-cy="login-signup-btn"]').click();
	// cy.contains("Log out");
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
