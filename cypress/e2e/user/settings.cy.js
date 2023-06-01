/* eslint-disable no-undef */
///<reference  types="Cypress" />

describe("settings", () => {
	beforeEach(() => {
		cy.login();
		cy.visit("http://localhost:3000/user/setting");
	});
	it("display the page properly", () => {
		cy.contains("Settings: Update password");
		cy.get("input").invoke("attr", "placeholder").should("eq", "Enter new password");

		cy.get('[data-cy="password-submit-btn"]').contains("Update password");
	});
	it("Submit the updated password properly", () => {
		cy.intercept("PUT", "**/update-password", { delay: 1000, body: { ok: true } }).as("updatePassword");
		cy.get("input").click().type("321321");
		cy.get('[data-cy="password-submit-btn"]').click();
		cy.wait("@updatePassword").its("request.body").should("contains", { password: "321321" });
	});
	it("show the error message properly", () => {
		// Submitting the form without any password
		cy.get('[data-cy="password-submit-btn"]').click();
		cy.get(".error-msg").contains("Password field is empty");

		//Password is less then 6 character long
		cy.get("input").click().type("32132");
		cy.get('[data-cy="password-submit-btn"]').click();
		cy.get(".error-msg").contains("Password should contain atleast 6 character");
	});
	it("shows correct submit button text", () => {
		cy.intercept("PUT", "**/update-password", { delay: 1000, body: { ok: true } }).as("updatePassword");
		cy.get("input").click().type("321321");
		cy.get('[data-cy="password-submit-btn"]').click();
		cy.get('[data-cy="password-submit-btn"]').contains("Processing");
	});
	it("test submit button has correct attribute", () => {
		cy.intercept("PUT", "**/update-password", { delay: 1000, body: { ok: true } }).as("updatePassword");
		cy.get("input").click().type("123123");
		cy.get('[data-cy="password-submit-btn"]').should("not.have.attr", "disabled");
		cy.get('[data-cy="password-submit-btn"]').click();
		cy.get('[data-cy="password-submit-btn"]').should("have.attr", "disabled");
	});
});
