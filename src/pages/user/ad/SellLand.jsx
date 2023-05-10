import React from "react";
import AdForm from "../../../components/forms/AdForm";
import "./ad.scss";
const SellLand = () => {
	return (
		<main className="ad-main">
			<h1>Sell Land</h1>
			{
				<AdForm
					action={"sell"}
					type="Land"
				/>
			}
		</main>
	);
};

export default SellLand;
