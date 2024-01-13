import React from "react";
import { Link } from "react-router-dom";
import "./cards.scss";

import { formatNumber } from "../../utils/helpers/helper.ad";
import AdFooter from "./AdFooter";

const AdCard = ({ ad }) => {
	const { id, data } = ad;

	//console.log(ad);
	return (
		<div className="card">
			<Link to={`/ad/${id}`}>
				<img
					src={data.photos[0]}
					alt={data?.price}
				/>
				<div className="card-body">
					<h3>£ {formatNumber(data.price)}</h3>
					<p className="address">{data.address}</p>
					{<AdFooter ad={data} />}
				</div>
			</Link>
		</div>
	);
};

export default AdCard;
