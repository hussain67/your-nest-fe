/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe("page navigation", () => {
	it("should navigate pages", () => {
		cy.visit("/");
		cy.get("[data-cy=mainnav-login-link]").click();
		cy.location("pathname").should("eq", "/account/login-register");
		cy.go("back");
		cy.location("pathname").should("eq", "/");
	});
});
