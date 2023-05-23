import React, { useEffect, useState } from "react";
import "./adView.scss";
import { useParams } from "react-router-dom";
import { getAd } from "../../utils/api/adApi";
import MapCard from "../../components/cards/MapCard";
import ContactForm from "../../components/forms/ContactForm";
import Carousal from "../../components/carousal/Carousal";

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

	const photos = ad?.photos.map(el => {
		return el.Location;
	});

	return (
		<>
			<div className="page-section ad-view">{photos && <Carousal photos={photos} />}</div>
			<div className="page-section">{<MapCard ad={ad} />}</div>
			<div className="page-section">{<ContactForm ad={ad} />}</div>
		</>
	);
};

export default AdView;
