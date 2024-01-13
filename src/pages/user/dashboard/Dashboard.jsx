import { useEffect } from "react";
import "./dashboard.scss";
import { useState } from "react";
import { getAllDocuments } from "../../../utils/firebase/firebaseAd";
import { toast } from "react-toastify";
import Spinner from "../../../components/spinner/Spinner";
import Advertisements from "../../../components/advertisements/Advertisements";
import { useAuthContext } from "../../../context/authContext";
function Dashboard() {
	const { auth } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const [ads, setAds] = useState([]);
	useEffect(() => {
		setLoading(true);
		const fetchAds = async () => {
			try {
				const ads = await getAllDocuments(auth.uid);
				setAds(ads);
				console.log(ads);
			} catch (error) {
				toast.error("something went wrong try again ");
			}
			setLoading(false);
		};
		fetchAds();
	}, [auth.uid]);
	if (loading) {
		return <Spinner />;
	}
	return (
		<div className="page-section">
			{
				<Advertisements
					ads={ads}
					type="all"
				/>
			}
		</div>
	);
}

export default Dashboard;
