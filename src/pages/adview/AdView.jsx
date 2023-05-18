import React, { useEffect, useState } from "react";
import "./adView.scss";
import { useParams } from "react-router-dom";
import { getAd } from "../../utils/api/adApi";
import MapCard from "../../components/cards/MapCard";

const AdView = () => {
	const { slug } = useParams();
	const [ad, setAd] = useState();

	console.log(ad);
	useEffect(() => {
		const fetchAd = async () => {
			try {
				const { ad } = await getAd(slug);
				setAd(ad[0]);
			} catch (err) {}
		};
		fetchAd();
	}, [slug]);

	return (
		<>
			<div className="page-section ad-view">
				<img
					src={ad?.photos[0].Location}
					alt=""
				/>
				{ad?.address}
			</div>
			<div className="page-section">{<MapCard ad={ad} />}</div>
		</>
	);
};

export default AdView;
