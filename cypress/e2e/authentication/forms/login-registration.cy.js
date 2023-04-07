/// <reference types="Cypress" />

/* eslint-disable no-undef */
describe("Authentication", () => {
	it("display login and registration form properly", () => {
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

	it("handle pre-registration properly", () => {
		cy.intercept("POST", "http://localhost:8000/api/v1/auth/pre-register*", { delay: 1000, body: { status: "Success" } }).as("preRegister");

		cy.visit("/account/login-register");

		//Fill required form fields
		cy.get('[data-cy="login-register-span"]').click();
		cy.get('[data-cy="login-signup-btn"]').as("signupBtn");
		cy.get("@signupBtn").should("have.text", "SIGN UP");
		cy.get("#name").type("shahid");
		cy.get("#email").type("hussain.msh67@yahoo.com");
		cy.get("#password").type("123abc");
		cy.get("#confirmPassword").type("123abc");

		//Element should not have wrong attribute
		cy.get("@signupBtn").should("not.have.attr", "disabled");

		cy.get("@signupBtn").click();

		cy.get("@signupBtn").contains("Waiting...");

		//Call the api with proper data
		cy.wait("@preRegister").its("request.body").should("contains", { name: "shahid", email: "hussain.msh67@yahoo.com", password: "123abc" });

		//Display info when receive proper response
		cy.get(".email-info-text").contains("Please check your email to verify your account");
	});
	it("handle registration activation properly", () => {
		cy.intercept("POST", "http://localhost:8000/api/v1/auth/register", {
			delay: 1000,
			body: {
				status: "Success",
				token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI3NmJhMGEzOGUzM2E4N2ExNzA1MTEiLCJpYXQiOjE2ODAzMDUwNTYsImV4cCI6MTY4MDMwODY1Nn0.0fHqCVkm5TGSJMP0aQByzhwFb8qGBv9_Hc-9Hx8Ni94",
				refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI3NmJhMGEzOGUzM2E4N2ExNzA1MTEiLCJpYXQiOjE2ODAzMDUwNTYsImV4cCI6MTY4MDkwOTg1Nn0.Y5wKKJh4ZzJT8Adj0lMbBxQwWkImN2INThZve8qlyEE",
				user: {
					name: "Shahid",
					email: "hussain.msh67@yahoo.com"
				}
			}
		}).as("register");

		cy.visit("/auth/account-activate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI3NmJhMGEzOGUzM2E4N2ExNzA1MTEiLCJpYXQiOjE2ODAzMDUwNTYsImV4cCI6MTY4MDMwODY1Nn0.0fHqCVkm5TGSJMP0aQByzhwFb8qGBv9_Hc-9Hx8Ni94");
		cy.location("pathname").should("eq", "/");
	});
});
