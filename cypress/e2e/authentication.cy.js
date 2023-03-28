/// <reference types="Cypress" />
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
	it("Submit the registration form properly", () => {
		cy.visit("/account/login-register");

		//Registration form will be displayed
		cy.get('[data-cy="login-register-span"]').click();
		cy.contains("SIGN UP");
	});
});

describe("Registration", () => {
	it("Submit the registration form properly", () => {
		//cy.intercept("POST", "http://localhost:8000/api/v1/auth/pre-register*", { status: "OK" });
		cy.visit("/account/login-register");

		//Registration form will be displayed
		cy.get('[data-cy="login-register-span"]').click();
		cy.contains("SIGN UP");
		cy.get('[data-cy="login-signup-btn"]').as("signupBtn");
		cy.get("#name").type("shahid");
		cy.get("#email").type("hussain.msh67@yahoo.com");
		cy.get("#password").type("123abc");
		cy.get("#confirmPassword").type("123abc");

		cy.get("@signupBtn").should(el => {
			expect(el.text()).to.eq("SIGN UP");
		});
		cy.get("@signupBtn").should("not.have.attr", "disabled");
		cy.get("@signupBtn").click();
		cy.get("@signupBtn").contains("Waiting...");
	});
});
describe("Auth", () => {
	beforeEach(() => {
		cy.task("seedDatabase");
	});
	it("connect", () => {
		cy.visit("/");
	});
});
