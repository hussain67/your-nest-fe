import React from "react";
import AdForm from "../../../components/forms/AdForm";

const SellHouse = () => {
	return (
		<div>
			{
				<AdForm
					action={"sell"}
					type={"house"}
				/>
			}
		</div>
	);
};

export default SellHouse;
