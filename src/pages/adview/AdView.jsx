import React, { useEffect, useState } from "react";
import "./adView.scss";
import { Link, useParams } from "react-router-dom";
import { getAd } from "../../utils/api/adApi";
import MapCard from "../../components/cards/MapCard";
import ContactForm from "../../components/forms/ContactForm";
import Carousal from "../../components/carousal/Carousal";
import AdInfoCard from "../../components/cards/AdInfoCard";
import { useAuthContext } from "../../context/authContext";

const AdView = () => {
	const { auth } = useAuthContext();
	const { slug } = useParams();
	const [ad, setAd] = useState();
	const isAdvertiser = ad?.postedBy?._id === auth.user?._id;

	// console.log(auth.user._id);
	// console.log(ad.postedBy._id);
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
					<div className="info-main">
						<p>{ad && <AdInfoCard ad={ad} />}</p>
						<p>
							{isAdvertiser ? (
								<div className="info-update">
									<button className="btn">
										<Link to={`/user/ad/${slug}`}>Edit Ad</Link>
									</button>{" "}
									<button className="btn info-btn-delete"> Delete Ad</button>
								</div>
							) : (
								""
							)}
						</p>
					</div>
					<div>{<MapCard ad={ad} />}</div>
				</div>
			</div>

			<div className="page-section">{<ContactForm ad={ad} />}</div>
		</article>
	);
};

export default AdView;
