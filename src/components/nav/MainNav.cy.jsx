import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainNav from "./MainNav";

describe("<MainNav />", () => {
	it("renders", () => {
		// see: https://on.cypress.io/mounting-react
		<BrowserRouter>
			cy.mount(
			<MainNav />)
		</BrowserRouter>;
	});
});
