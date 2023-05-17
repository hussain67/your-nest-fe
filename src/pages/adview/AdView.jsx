import React, { useEffect, useState } from "react";
import "./adView.scss";
import { useParams } from "react-router-dom";
import { getAd } from "../../utils/api/adApi";

const AdView = () => {
	const { slug } = useParams();
	const [ad, setAd] = useState();

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
		<div className="page-section ad-view">
			<img
				src={ad?.photos[0].Location}
				alt=""
			/>
			{ad?.address}
		</div>
	);
};

export default AdView;
