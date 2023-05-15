/* eslint-disable no-undef */
///<reference types="Cypress"/>

import AdCard from "../../../src/components/cards/AdCard";

const ad = {
	action: "Sell",
	address: "Freshford, Bath, UK",
	bedrooms: 4,
	bathrooms: 2,
	photos: [
		{
			ServerSideEncryption: "AES256",
			Location: "https://your-nest-bucket.s3.eu-west-1.amazonaws.com/d93dd4dd-c874-4329-b304-9ed793d9b692.jpeg",

			Bucket: "your-nest-bucket"
		}
	],

	uploading: false,
	price: 4000,
	carparks: 1,
	landsize: "200 sqm",
	title: "House to sell",
	description: "Very Good condition",

	type: "House"
};
describe("AdCard", () => {
	it("display the card properly", () => {
		cy.mount(<AdCard ad={ad} />);
	});
});
