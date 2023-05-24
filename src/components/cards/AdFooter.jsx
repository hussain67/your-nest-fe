import React from "react";

import { TbBath } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
const AdFooter = ({ ad }) => {
	return (
		<div className="card-footer">
			{ad.bedrooms ? (
				<p>
					<IoBedOutline /> {ad.bedrooms}
				</p>
			) : (
				""
			)}
			{ad.landsize ? (
				<p>
					<BiArea /> {ad.landsize}
				</p>
			) : (
				""
			)}
			{ad.bathrooms ? (
				<p>
					<TbBath /> {ad.bathrooms}
				</p>
			) : (
				""
			)}
		</div>
	);
};

export default AdFooter;
