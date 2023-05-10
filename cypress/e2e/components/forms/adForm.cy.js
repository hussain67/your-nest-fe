/* eslint-disable no-undef */
///<reference types="Cypress" />

describe("adForm", () => {
	beforeEach(() => {
		// cy.intercept("GET", "https://maps.googleapis.com/maps/api/place/js/AutocompletionService.GetPredictionsJson?*");

		cy.visit("http://localhost:3000/ad/create");
		cy.login();
	});
	const selectAddress = () => {
		cy.get(".css-qbdosj-Input").type("Frederick Road").wait(500);

		cy.get(".css-1n6sfyn-MenuList > div").each(($el, index, $list) => {
			if ($el[0].innerText === "Frederick Road, Sutton, UK") {
				cy.wrap($el).click();
			}
		});
	};
	const uploadImageHouse = () => {
		cy.get('[data-cy="image-upload"]');
		cy.get('[data-cy="image-upload-input"]').selectFile("cypress/fixtures/house1.jpg", { force: true });
	};
	const fillFormHouse = () => {
		cy.get('input[placeholder = "Enter price"]').type(20000, { force: true });
		cy.get('input[placeholder = "Enter number of bedrooms"]').type(3);
		cy.get('input[placeholder = "Enter number of bathrooms"]').type(2);
		cy.get('input[placeholder = "Enter number of carparks"]').type(1);
		cy.get('input[placeholder = "Size of land"]').type("2 acres");
		cy.get('input[placeholder = "Enter title"]').type("test title");
		cy.get('textarea[placeholder = "Enter description"]').type("Excellent condition");
	};
	describe("adForm House Sell", () => {
		it("display the form properly", () => {
			cy.contains("Sell").click();
			cy.contains("House").click();

			// can Select address
			selectAddress();

			//Can fill form for house
			fillFormHouse();

			//Can upload house image

			cy.get('[data-cy="image-upload-input"]').selectFile("cypress/fixtures/house1.jpg", { force: true });
		});

		it("House, Sell, submit the data properly", () => {
			cy.intercept("POST", "**/create-ad", { delay: 2000, body: { status: "Success" } }).as("createAd");

			cy.contains("Sell").click();
			cy.contains("House").click();

			// can Select address
			selectAddress();

			//Can fill form for house
			fillFormHouse();

			//Can upload house image

			cy.get('[data-cy="image-upload-input"]').selectFile("cypress/fixtures/house1.jpg", { force: true });
			cy.wait(1000);
			cy.get('[data-cy="sell-rent-btn"]').as("submitBtn").click();
			cy.wait("@createAd").its("request.body").should("contains", { price: "20000", bedrooms: "3", bathrooms: "2", carparks: "1", landsize: "2 acres", title: "test title", description: "Excellent condition" });
		});
		it("test that submit button text and attribute is accurate", () => {
			cy.intercept("POST", "**/create-ad", { delay: 2000, body: { status: "Success" } }).as("createAd");

			cy.contains("Sell").click();
			cy.contains("House").click();

			// Select address
			selectAddress();

			// Fill form for house
			fillFormHouse();

			// Upload house image

			cy.get('[data-cy="image-upload-input"]').selectFile("cypress/fixtures/house1.jpg", { force: true });
			cy.wait(1000);
			cy.get('[data-cy="sell-rent-btn"]').as("submitBtn");

			// Before submit, Btn text should be Submit
			cy.get("@submitBtn").contains("Submit");

			// Before submit, Btn attribute should not be disabled
			cy.get("@submitBtn").should("not.have.attr", "disabled");

			// Just after submit Btn text should be Saving...
			cy.get("@submitBtn").click().contains("Saving...");

			// After submit, Btn attribute should be disabled
			cy.get("@submitBtn").should("have.attr", "disabled");
		});
		it("handle error sign based on filling of form fields", () => {
			cy.contains("Sell").click();
			cy.contains("House").click();

			cy.get('[data-cy="sell-rent-btn"]').click();

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
			cy.get(".css-qbdosj-Input").type("Frederick Road").wait(500);

			cy.get(".css-1n6sfyn-MenuList > div").each(($el, index, $list) => {
				if ($el[0].innerText === "Frederick Road, Sutton, UK") {
					cy.wrap($el).click();
				}
			});
			cy.get('input[placeholder = "Enter price"]').click().type(10000).blur().should("not.have.class", "error");
			cy.get('input[placeholder = "Enter number of bedrooms"]').type(4).blur().should("not.have.class", "error");
			cy.get('input[placeholder = "Enter number of bathrooms"]').type(2).blur().should("not.have.class", "error");
			cy.get('input[placeholder = "Enter number of carparks"]').type(1).blur().should("not.have.class", "error");

			cy.get('input[placeholder = "Size of land"]').type("120 acre").blur().should("not.have.class", "error");
			cy.get('input[placeholder = "Enter title"]').type("title").blur().should("not.have.class", "error");
			cy.get('textarea[placeholder = "Enter description"]').click().type("fake description").blur().should("not.have.class", "error");
		});
	});
});

//cy.get(".image-upload img").should("have.length", 1);
