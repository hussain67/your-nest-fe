/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe("page navigation", () => {
	beforeEach(() => {
		cy.task("setupDb");
	});
	it("should navigate pages", () => {
		cy.visit("/");
		cy.get('[data-cy = "mainnav-login-link"]').click();
		cy.location("pathname").should("eq", "/account/login-register");
		cy.go("back");
		cy.location("pathname").should("eq", "/");
	});
	it.only("should change text from login to logout", () => {
		//cy.visit("/account/login-register");
		cy.login();
	});
});
