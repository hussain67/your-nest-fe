/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe("Authentication - Registration", () => {
	beforeEach(() => {
		cy.task("setupDb");
	});
	it("register an user", () => {
		cy.request("POST", "http://localhost:8000/api/v1/auth/pre-register", { name: Cypress.env("name"), email: Cypress.env("email"), password: Cypress.env("password"), type: "test" })
			.its("body")
			.then(response => {
				const authToken = response.token;
				if (authToken) {
					cy.visit(`/auth/account-activate/${authToken}`);
					cy.location("pathname").should("eq", `/`);
					cy.contains("Log out");
				}
			});
	});
});
