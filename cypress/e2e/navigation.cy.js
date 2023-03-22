/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe("page navigation", () => {
	it("should navigate pages", () => {
		cy.visit("/");
		cy.get("[data-cy=mainnav-login-link]").click();
		cy.location("pathname").should("eq", "/login");
		cy.go("back");
		cy.location("pathname").should("eq", "/");
		cy.get('[data-cy="mainnav-register-link"]').click();
		cy.location("pathname").should("eq", "/register");
		cy.get('[data-cy="mainnav-home-link"]').click();
		cy.location("pathname").should("eq", "/");
	});
});
