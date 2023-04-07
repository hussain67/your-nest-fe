/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe("forgotPassword", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/auth/forgot-password");
		cy.get('[data-cy="login-signup-btn"]').as("submitBtn");
	});
	it("verify email input field works properly ", () => {
		// Input fild work properly
		cy.get("#email").type("test@yahoo.com").should("have.value", "test@yahoo.com");

		//Submit the form
	});
	it("shows error message when submitting the form without input email", () => {
		cy.get("@submitBtn").click();
		cy.contains("Valid email is required");
	});
	it("shows error message when submitting the form without proper input email", () => {
		cy.get("#email").type("test@yahoo");
		cy.get("@submitBtn").click();
		cy.contains("Valid email is required");
	});
	it("works properly when form is submitted with a valid email", () => {
		cy.intercept("POST", "http://localhost:8000/api/v1/auth/forgot-password", { delay: 1000, body: { status: "Success" } }).as("forgotPassword");
		cy.get("#email").type("test@yahoo.com");
		cy.get("@submitBtn").click();

		// In submit button text Waiting... should appear
		cy.get("@submitBtn").contains("Waiting...");
		cy.get(".email-info-text").should("contain", "Please check your email for password reset link");
	});
});
