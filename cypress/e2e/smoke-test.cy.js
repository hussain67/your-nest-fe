/* eslint-disable no-undef */

describe("Authentication", () => {
	beforeEach(() => {
		cy.task("setupDB");
	});
	it("register an user", () => {
		cy.request("POST", "http://localhost:8000/api/v1/auth/pre-register", { name: "Shahid", email: "hussain.msh67@yahoo.com", password: "123123", type: "test" }).then(response => {
			const token = response.body.token;
			cy.visit(`/auth/account-activate/${token}`);
			cy.location("pathname").should("eq", `/auth/account-activate/${token}`);
		});
	});
});
// const registerToken = Cypress.env("registerToken");
// describe("Authentication", () => {
// 	it("register an user", () => {
// 		cy.task("preRegister");
// 	});
// 	it("token", () => {
// 		console.log(registerToken);
// 	});
// });
