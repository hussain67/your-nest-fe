import React, { useEffect, useState } from "react";
import "./home.scss";
import { getDocuments } from "../../utils/firebase/firebaseAd";
import Advertisements from "../../components/advertisements/Advertisements";
import Spinner from "../../components/spinner/Spinner";

const Home = () => {
	const [adHouseSell, setAdHouseSell] = useState([]);
	const [adHouseRent, setAdHouseRent] = useState([]);
	const [adLandSell, setAdLandSell] = useState([]);
	const [adLandRent, setAdLandRent] = useState([]);
	const [loading, setLoading] = useState(false);

	// Fetch Add Data
	useEffect(() => {
		setLoading(true);
		const fetchAds = async () => {
			try {
				//House Sell Ad
				const houseSell = await getDocuments("house", "sell", 3);
				setAdHouseSell(houseSell.listings);

				// House rent Ad
				const houseRent = await getDocuments("house", "rent", 3);
				setAdHouseRent(houseRent.listings);

				// Land Sell Ad
				const landSell = await getDocuments("land", "sell", 3);
				setAdLandSell(landSell.listings);

				// Land Sell Ad
				const landRent = await getDocuments("land", "rent", 3);
				setAdLandRent(landRent.listings);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchAds();
	}, []);
	if (loading) {
		return <Spinner size="" />;
	}
	return (
		<main className="home">
			<section className="page-section">
				<Advertisements
					ads={adHouseRent}
					type="house"
					action="rent"
				/>
				<Advertisements
					ads={adHouseSell}
					type="house"
					action="sell"
				/>
				<Advertisements
					ads={adLandRent}
					type="land"
					action="rent"
				/>
				<Advertisements
					ads={adLandSell}
					type="land"
					action="sell"
				/>
			</section>
		</main>
	);
};

export default Home;
