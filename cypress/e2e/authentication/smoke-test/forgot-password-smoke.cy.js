/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe("forgotPassword", () => {
	// beforeEach(() => {
	// 	cy.visit("http://localhost:3000/auth/forgot-password");
	// });
	it("should receive proper response when http request with correct email is send", () => {
		cy.request("POST", "http://localhost:8000/api/v1/auth/forgot-password", { email: "hussain.msh67@yahoo.com", type: "test" }).then(resp => {
			console.log(resp.body);
			cy.wait(1000);
			const token = resp.body.token;
			if (token) {
				cy.visit(`/auth/access-account/${token}`);
				cy.location("pathname").should("eq", `/`);
				cy.contains("Log out");
			}
		});
	});
});
