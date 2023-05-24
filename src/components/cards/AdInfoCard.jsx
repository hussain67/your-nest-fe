import React from "react";
import AdFooter from "./AdFooter";
import "./cards.scss";
import "./adInfoCard.scss";
import { formatNumber } from "../../utils/helpers/helper.ad";
import { FaMapMarkerAlt } from "react-icons/fa";
const AdInfo = ({ ad }) => {
	console.log(ad, "adInfo");
	const { title, price, address, description } = ad;
	return (
		<article className="ad-info">
			<h3>
				{title} £ {formatNumber(price)}
			</h3>
			<h4>
				<FaMapMarkerAlt className="map-marker" />
				{address}
			</h4>
			<p>Description: {description}</p>
			<p className="footer">{<AdFooter ad={ad} />}</p>
		</article>
	);
};

export default AdInfo;
