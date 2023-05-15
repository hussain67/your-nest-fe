import React from "react";
import "./cards.scss";

import { TbBath } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import { formatNumber } from "../../utils/helpers/helper.ad";

const AdCard = ({ ad }) => {
	console.log(ad);
	return (
		<div className="card">
			<img
				src={ad.photos[0].Location}
				alt={ad.price}
			/>
			<div className="card-body">
				<h3>£ {formatNumber(ad.price)}</h3>
				<p className="address">{ad.address}</p>
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
			</div>
		</div>
	);
};

export default AdCard;
