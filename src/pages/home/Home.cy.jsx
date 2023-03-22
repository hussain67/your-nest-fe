import React from "react";
import Home from "./Home";

describe("<Home />", () => {
	it("renders", () => {
		// see: https://on.cypress.io/mounting-react
		// eslint-disable-next-line no-undef
		cy.mount(<Home />);
	});
});
