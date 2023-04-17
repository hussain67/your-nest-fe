/* eslint-disable no-undef */
import AdForm from "../../src/components/forms/AdForm";
import { AuthProvider } from "../../src/context/authContext";
describe("adForm", () => {
	it("display the form properly when type is House", () => {
		cy.mount(
			<AuthProvider>
				<AdForm type="House" />
			</AuthProvider>
		);
		cy.get('textarea[placeholder = "Enter address"]').type("100 test road").should("have.value", "100 test road");
		cy.get('input[placeholder = "Enter price"]').type("10000");
		cy.get('input[placeholder = "Enter number of bedrooms"]').type(2).should("have.value", 2);
		cy.get('input[placeholder = "Enter number of bathrooms"]').type(1).should("have.value", 1);
		cy.get('input[placeholder = "Enter number of carparks"]').type(3).should("have.value", 3);

		cy.get('input[placeholder = "Size of land"]');
		cy.get('input[placeholder = "Enter title"]');
		cy.get('textarea[placeholder = "Enter description"]').type("Excellent condition").should("have.value", "Excellent condition");
		cy.contains("Upload photos");

		// cy.get('input[placeholder = ""]');
	});
	it("display the form properly when type is House", () => {
		cy.mount(
			<AuthProvider>
				<AdForm type="Land" />
			</AuthProvider>
		);
		cy.get('textarea[placeholder = "Enter address"]').type("100 test road").should("have.value", "100 test road");
		cy.get('input[placeholder = "Enter number of bedrooms"]').should("not.exist");
		cy.get('input[placeholder = "Enter number of bathrooms"]').should("not.exist");
		cy.get('input[placeholder = "Enter number of carparks"]').should("not.exist");
	});
});
