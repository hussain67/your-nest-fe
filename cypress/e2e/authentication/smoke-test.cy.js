/// <reference types="Cypress" />

import { wait } from "@testing-library/user-event/dist/utils";

/* eslint-disable no-undef */

describe("Authentication", () => {
	beforeEach(() => {
		cy.task("setupDB");
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

	it("Log in a registered user", () => {
		// First register a user
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

		// Log in
		cy.contains("Login/Register").click();

		//Fill required form fields
		cy.get("#email").click();
		cy.get("#email").type(Cypress.env("email"));
		cy.get("#password").type(Cypress.env("password"));
		cy.get('[data-cy="login-signup-btn"]').click();
		cy.contains("Log out");
		cy.location("pathname")
			.should("eq", "/")
			.then(() => {
				const auth = window.localStorage.getItem("auth");
				const user = JSON.parse(auth);
				expect(user).to.be.an("object");
				expect(user).to.have.key(["token", "refreshToken", "user"]);
			});
	});

	it("do not log in an unregistered user", () => {
		cy.visit("/account/login-register");
		cy.get("#email").click();
		cy.get("#email").type("unregister@yahoo.com");
		cy.get("#password").type("123123");
		cy.get('[data-cy="login-signup-btn"]').click();

		cy.contains("Home").then(() => {
			const user = localStorage.getItem("auth");
			// eslint-disable-next-line no-unused-expressions
			expect(user).to.be.null;
		});
	});

	it.only("do not log in with incorrect password", () => {
		// First register a user
		cy.request("POST", "http://localhost:8000/api/v1/auth/pre-register", { name: "shahid", email: "hussain.msh67@yahoo.com", password: "123123", type: "test" })
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
		cy.get("#email").click();
		cy.get("#email").type("hussain.msh67@yahoo.com");
		cy.get("#password").type("1231234");
		cy.contains("Login/Register");
		cy.get('[data-cy="login-signup-btn"]').click();
		const auth = localStorage.getItem("auth");
		// eslint-disable-next-line no-unused-expressions
		expect(auth).to.be.null;
	});
});
