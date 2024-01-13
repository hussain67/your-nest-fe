import React, { useCallback, useEffect, useState } from "react";
import "./adView.scss";
import { useParams } from "react-router-dom";
import MapCard from "../../components/cards/MapCard";
import ContactForm from "../../components/forms/ContactForm";
import Carousal from "../../components/carousal/Carousal";
import { useAuthContext } from "../../context/authContext";
import { getAd } from "../../utils/firebase/firebaseAd";
import EditDelit from "./EditDelit";
import AdInfoCard from "../../components/cards/AdInfoCard";

const AdView = () => {
	const { auth } = useAuthContext();
	const { slug } = useParams();
	const [ad, setAd] = useState();

	const isAdvertiser = ad?.userRef === auth.uid;

	const fetchAd = useCallback(
		async function () {
			try {
				const data = await getAd(slug);
				setAd(data);
			} catch (err) {}
		},
		[slug]
	);

	useEffect(() => {
		fetchAd();
	}, [fetchAd]);

	return (
		<article className="ad-view">
			<div className="page-section carousal">
				<Carousal photos={ad?.photos} />
			</div>
			<div className="page-section ">
				<div className="info">
					<div className="info-main">
						{ad && <AdInfoCard ad={ad} />}
						{isAdvertiser && (
							<EditDelit
								ad={ad}
								slug={slug}
							/>
						)}
					</div>

					<div>{<MapCard ad={ad} />}</div>
				</div>
			</div>
			{!isAdvertiser && <div className="page-section">{ad && <ContactForm ad={ad} />}</div>}
		</article>
	);
};

export default AdView;
