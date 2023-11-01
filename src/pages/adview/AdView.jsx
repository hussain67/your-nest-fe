import React, { useCallback, useEffect, useState } from "react";
import "./adView.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteAd, getAd, removeImage } from "../../utils/api/adApi";
import MapCard from "../../components/cards/MapCard";
import ContactForm from "../../components/forms/ContactForm";
import Carousal from "../../components/carousal/Carousal";
import AdInfoCard from "../../components/cards/AdInfoCard";
import { useAuthContext } from "../../context/authContext";

const AdView = () => {
	const navigate = useNavigate();
	const { auth } = useAuthContext();
	const { slug } = useParams();
	const [ad, setAd] = useState();
	const isAdvertiser = ad?.postedBy?._id === auth.user?._id;

	const fetchAd = useCallback(
		async function () {
			try {
				const { ad } = await getAd(slug);
				setAd(ad[0]);
			} catch (err) {}
		},
		[slug]
	);

	console.log(ad);
	useEffect(() => {
		fetchAd();
	}, [fetchAd]);

	const photos = ad?.photos.map(el => {
		return el.Location;
	});
	const handleDelete = async () => {
		await deleteAd(ad._id);
		await ad.photos?.map(photo => removeImage(photo));
		navigate("/");
	};

	return (
		<article className="ad-view">
			<div className="page-section carousal">{photos && <Carousal photos={photos} />}</div>
			<div className="page-section">
				<div className="info">
					<div className="info-main">
						<section>{ad && <AdInfoCard ad={ad} />}</section>
						<div>
							{isAdvertiser ? (
								<div className="info-update">
									<button className="btn">
										<Link to={`/user/ad/${slug}`}>Edit Ad</Link>
									</button>{" "}
									<button
										className="btn info-btn-delete"
										onClick={handleDelete}
									>
										{" "}
										Delete Ad
									</button>
								</div>
							) : (
								""
							)}
						</div>
					</div>
					<div>{<MapCard ad={ad} />}</div>
				</div>
			</div>
			<div className="page-section">{<ContactForm ad={ad} />}</div>
		</article>
	);
};

export default AdView;
