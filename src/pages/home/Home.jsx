import React, { useEffect, useState } from "react";
import AdCard from "../../components/cards/AdCard";
import { getAds } from "../../utils/api/adApi";
//import { useAuthContext } from "../../context/authContext";
import "./home.scss";

const Home = () => {
	// const { auth } = useAuthContext();
	// console.log(auth);
	const [sellAds, setSellAds] = useState([]);
	const [rentAds, setRentAds] = useState([]);
	console.log(sellAds);
	console.log(rentAds);
	useEffect(() => {
		const fetchAds = async () => {
			try {
				const resp = await getAds();
				setSellAds(resp.sellAds);
				setRentAds(resp.rentAds);
			} catch (error) {
				console.log(error);
			}
		};
		fetchAds();
	}, []);
	return (
		<section className="page-section">
			<h1 className="action">For Sell</h1>
			<article className="card-container">
				{sellAds?.map(ad => {
					return (
						<AdCard
							ad={ad}
							key={ad._id}
						/>
					);
				})}
			</article>
			<h1 className="action">For Rent</h1>
			<article className="card-container">
				{rentAds?.map(ad => {
					return (
						<AdCard
							ad={ad}
							key={ad._id}
						/>
					);
				})}
			</article>
		</section>
	);
};

export default Home;
