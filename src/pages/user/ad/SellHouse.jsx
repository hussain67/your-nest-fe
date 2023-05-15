import React from "react";
import AdForm from "../../../components/forms/AdForm";
import "./ad.scss";

const SellHouse = () => {
	return (
		<main className="ad-main">
			<h1>Sell House</h1>

			{
				<AdForm
					action={"Sell"}
					type="House"
				/>
			}
		</main>
	);
};

export default SellHouse;
