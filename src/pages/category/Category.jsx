import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocuments, getMoreDocuments } from "../../utils/firebase/firebaseAd";
import Advertisements from "../../components/advertisements/Advertisements";
import "./category.scss";

function Category() {
	const { type, action } = useParams();
	const [ads, setAds] = useState([]);
	const [listingLength, setListingLength] = useState(3);
	const [lastFetchedAds, setLastFetchedAds] = useState(null);

	useEffect(() => {
		const fetchAds = async () => {
			const resp = await getDocuments(type, action, 6);
			setAds(resp?.listings);
			setLastFetchedAds(resp?.lastVisible);
		};
		fetchAds();
	}, [action, type]);

	// Fetch more ads

	const fetchMoreAds = async () => {
		const resp = await getMoreDocuments(type, action, 3, lastFetchedAds);

		setAds(ads => {
			return [...ads, ...resp.listings];
		});
		setLastFetchedAds(resp?.lastVisible);
		setListingLength(resp?.listings.length);
	};

	return (
		<section className="page-section">
			<Advertisements
				ads={ads}
				action={action}
				type={type}
			/>
			<div className="show-more-cat">{listingLength === 3 && <span onClick={fetchMoreAds}>Show more</span>}</div>
		</section>
	);
}

export default Category;
