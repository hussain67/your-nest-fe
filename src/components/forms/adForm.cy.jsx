/* eslint-disable no-undef */
import AdForm from "./AdForm";
import { AuthProvider } from "../../context/authContext";

const renderAdForm = type => {
	cy.mount(
		<AuthProvider>
			<AdForm type={type} />
		</AuthProvider>
	);
};
describe.only("adForm type = House", () => {
	it("Display the title properly", () => {
		renderAdForm("House");
	});
	it("display the form properly when type is House", () => {
		renderAdForm("House");
		//cy.get('in[placeholder = "Search for address"]').type("100 test road").should("have.value", "100 test road");
		cy.get(".css-qbdosj-Input");
		cy.get('input[placeholder = "Enter price"]').type("10000");
		cy.get('input[placeholder = "Enter number of bedrooms"]').type(2).should("have.value", 2);
		cy.get('input[placeholder = "Enter number of bathrooms"]').type(1).should("have.value", 1);
		cy.get('input[placeholder = "Enter number of carparks"]').type(3).should("have.value", 3);

		cy.get('input[placeholder = "Size of land"]');
		cy.get('input[placeholder = "Enter title"]');
		cy.get('textarea[placeholder = "Enter description"]').type("Excellent condition").should("have.value", "Excellent condition");
		cy.contains("Upload photos");
	});

	it("display error sign when form fields are not properly filled", () => {
		renderAdForm("House");
		cy.get('[data-cy="sell-rent-btn"]').as("submitBtn");
		cy.get("@submitBtn").click();

		//Should display error message
		cy.get(".error-msg").should("contain", "Please fill all the fields properly");

		//All input elements should contain error class
		//cy.get(".css-qbdosj-Input").should("have.class", "error");
		cy.get('input[placeholder = "Enter price"]').should("have.class", "error");
		cy.get('input[placeholder = "Enter number of bedrooms"]').should("have.class", "error");
		cy.get('input[placeholder = "Enter number of bathrooms"]').should("have.class", "error");
		cy.get('input[placeholder = "Enter number of carparks"]').should("have.class", "error");

		cy.get('input[placeholder = "Size of land"]').should("have.class", "error");
		cy.get('input[placeholder = "Enter title"]').should("have.class", "error");
		cy.get('textarea[placeholder = "Enter description"]').should("have.class", "error");

		//When an input is filled properly it should not contain error class
		cy.get('input[placeholder = "Enter price"]').click().type(10000).blur().should("not.have.class", "error");
		cy.get('input[placeholder = "Enter number of bedrooms"]').type(4).blur().should("not.have.class", "error");
		cy.get('input[placeholder = "Enter number of bathrooms"]').type(2).blur().should("not.have.class", "error");
		cy.get('input[placeholder = "Enter number of carparks"]').type(1).blur().should("not.have.class", "error");

		cy.get('input[placeholder = "Size of land"]').type("120 acre").blur().should("not.have.class", "error");
		cy.get('input[placeholder = "Enter title"]').type("title").blur().should("not.have.class", "error");
		cy.get('textarea[placeholder = "Enter description"]').click().type("fake description").blur().should("not.have.class", "error");
	});
	it.only("submit the data properly", () => {
		renderAdForm("House");

		//cy.get(".css-qbdosj-Input");
		cy.get('input[placeholder = "Enter price"]').type("10000");
		cy.get('input[placeholder = "Enter number of bedrooms"]').type(3);
		cy.get('input[placeholder = "Enter number of bathrooms"]').type(2);
		cy.get('input[placeholder = "Enter number of carparks"]').type(1);

		cy.get('input[placeholder = "Size of land"]').type(2344);
		cy.get('input[placeholder = "Enter title"]').type("test title");
		cy.get('textarea[placeholder = "Enter description"]').type("Excellent condition");
		cy.get('[data-cy="sell-rent-btn"]').as("submitBtn").click();
	});
});
describe("type = Land", () => {
	it("display the form properly when type is Land", () => {
		renderAdForm("Land");
		//	cy.get('textarea[placeholder = "Enter address"]').type("100 test road").should("have.value", "100 test road");
		cy.get('input[placeholder = "Enter price"]').should("exist");
		cy.get('input[placeholder = "Enter number of bedrooms"]').should("not.exist");
		cy.get('input[placeholder = "Enter number of bathrooms"]').should("not.exist");
		cy.get('input[placeholder = "Enter number of carparks"]').should("not.exist");
	});
	it("send required data to back-end, when the form is properly fillde and the submit button is clicked", () => {});
});
