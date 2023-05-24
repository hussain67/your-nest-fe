import React, { useEffect, useState } from "react";
import "./adView.scss";
import { useParams } from "react-router-dom";
import { getAd } from "../../utils/api/adApi";
import MapCard from "../../components/cards/MapCard";
import ContactForm from "../../components/forms/ContactForm";
import Carousal from "../../components/carousal/Carousal";
import AdInfoCard from "../../components/cards/AdInfoCard";

const AdView = () => {
	const { slug } = useParams();
	const [ad, setAd] = useState();

	//console.log(ad);
	useEffect(() => {
		const fetchAd = async () => {
			try {
				const { ad } = await getAd(slug);
				setAd(ad[0]);
			} catch (err) {}
		};
		fetchAd();
	}, [slug]);

	const photos = ad?.photos.map(el => {
		return el.Location;
	});

	return (
		<article className="ad-view">
			<div className="page-section carousal">{photos && <Carousal photos={photos} />}</div>
			<div className="page-section">
				<div className="info">
					<div className="info-main">{ad && <AdInfoCard ad={ad} />}</div>
					<div>{<MapCard ad={ad} />}</div>
				</div>
			</div>
			<div className="page-section">{<ContactForm ad={ad} />}</div>
		</article>
	);
};

export default AdView;
