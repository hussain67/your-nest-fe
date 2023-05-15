import React from "react";
import AdForm from "../../../components/forms/AdForm";
import "./ad.scss";
const RentHouse = () => {
	return (
		<main className="ad-main">
			<h1>Rent House</h1>

			{
				<AdForm
					action={"Rent"}
					type="House"
				/>
			}
		</main>
	);
};

export default RentHouse;
