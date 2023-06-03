import React, { useEffect, useState } from "react";
import AdCard from "../../../components/cards/AdCard";
import { useAuthContext } from "../../../context/authContext";
import { userAds } from "../../../utils/api/adApi";
//import Sidebar from "../../../components/nav/Sidebar";
import "./dashboard.scss";
const Dashboard = () => {
	const { auth } = useAuthContext();
	const user = auth.user?.role?.includes("Seller");
	const [ads, setAds] = useState([]);
	const [total, setTotal] = useState();
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const handlePageLoading = () => {
		setPage(page + 1);
	};
	useEffect(() => {
		const fetchAds = async () => {
			setLoading(true);
			const resp = await userAds(page);
			const allAds = [...ads, ...resp.ads];
			setTotal(resp.total);
			setAds(allAds);
			setLoading(false);
		};
		fetchAds();
	}, [page]);

	return (
		<>
			<article className="page-section dashboard">
				{user ? (
					<div className="dashboard-seller">
						<h1>
							Hi {auth?.user.name}, you have {total} advertisement.
						</h1>
						<div className="card-container">
							{ads?.map(ad => {
								return <AdCard ad={ad} />;
							})}
						</div>
					</div>
				) : (
					<div className="dashboard-byer">
						<h1>Hi {auth?.user?.name}, welcome to Your-nest</h1>
					</div>
				)}
				{ads.length < total && (
					<div className="load-more">
						<button onClick={handlePageLoading}>{loading ? "Loading" : "Load more"}</button>
					</div>
				)}
			</article>{" "}
		</>
	);
};

export default Dashboard;
