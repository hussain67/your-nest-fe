/// <reference types="Cypress" />
/* eslint-disable no-undef */
let user;
describe("Authentication", () => {
	beforeEach(() => {
		cy.task("setupDB");
	});
	it("register an user", () => {
		cy.request("POST", "http://localhost:8000/api/v1/auth/pre-register", { name: "shahid", email: "hussain.msh67@yahoo.com", password: "123123", type: "test" })
			.its("body")
			.then(response => {
				const authToken = response.token;
				user = authToken;
				if (authToken) {
					cy.visit(`/auth/account-activate/${authToken}`);
					cy.location("pathname").should("eq", `/account/login-register`);
				}
			});
	});

	it("Log in a registered user", () => {
		// First register a user
		cy.request("POST", "http://localhost:8000/api/v1/auth/pre-register", { name: "shahid", email: "hussain.msh67@yahoo.com", password: "123123", type: "test" })
			.its("body")
			.then(response => {
				const authToken = response.token;
				if (authToken) {
					cy.visit(`/auth/account-activate/${authToken}`);
				}
			});

		// Log in
		//cy.visit("/account/login-register");

		//Fill required form fields
		cy.get("#email").click();
		cy.get("#email").type("hussain.msh67@yahoo.com");
		cy.get("#password").type("123123");
		cy.get('[data-cy="login-signup-btn"]').click();
		cy.location("pathname")
			.should("eq", "/")
			.then(() => {
				const jwt = window.localStorage.getItem("jwt");
				const user = JSON.parse(jwt);
				expect(user).to.be.an("object");
				expect(user).to.have.key(["token", "refreshToken", "user"]);

				//console.log(jwt);
			});
	});

	it.only("do not log in an unregistered user", () => {
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

	it("do not log in with incorrect password", () => {
		// First register a user
		cy.request("POST", "http://localhost:8000/api/v1/auth/pre-register", { name: "shahid", email: "hussain.msh67@yahoo.com", password: "123123", type: "test" })
			.its("body")
			.then(response => {
				const authToken = response.token;
				if (authToken) {
					cy.visit(`/auth/account-activate/${authToken}`);
				}
			});
		// try to log in with wrong password
		cy.get("#email").click();
		cy.get("#email").type("hussain.msh67@yahoo.com");
		cy.get("#password").type("1231234");
		cy.get('[data-cy="login-signup-btn"]').click();
	});
});
