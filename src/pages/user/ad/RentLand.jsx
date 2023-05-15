import React from "react";
import AdForm from "../../../components/forms/AdForm";
import "./ad.scss";
const RentLand = () => {
	return (
		<main className="ad-main">
			<h1>Rent Land</h1>
			{
				<AdForm
					action={"Rent"}
					type="Land"
				/>
			}
		</main>
	);
};
export default RentLand;
