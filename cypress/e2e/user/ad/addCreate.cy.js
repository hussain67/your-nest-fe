/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe("addCreate", () => {
	it("should display page components", () => {
		cy.login();
		cy.visit("/ad/create");
		cy.contains("Sell");
		cy.contains("Rent");
		cy.get(".sell-btn").click();
		cy.contains("House");
		cy.contains("Land");
		cy.get('[data-cy="btn-sell-house"]').click();
		cy.location("pathname").should("eq", "/ad/create/sell/house");
	});
});
