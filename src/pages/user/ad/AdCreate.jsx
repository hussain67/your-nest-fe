import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adCreate.scss";

const AdCreate = () => {
	const [sell, setSell] = useState(false);
	const [rent, setRent] = useState(false);
	const navigate = useNavigate();

	const handleSell = () => {
		setSell(true);
		setRent(false);
	};
	const handleRent = () => {
		setSell(false);
		setRent(true);
	};
	return (
		<section className="ad-create">
			<article>
				<button
					className="sell-btn"
					onClick={handleSell}
				>
					Sell
				</button>
				{sell && (
					<div className="btn-container">
						<button onClick={() => navigate("/ad/create/sell/house")}>House</button>
						<button onClick={() => navigate("/ad/create/sell/land")}>Land</button>
					</div>
				)}
			</article>
			<article>
				<button
					className="rent-btn"
					onClick={handleRent}
				>
					Rent
				</button>
				{rent && (
					<div className="btn-container">
						<button onClick={() => navigate("/ad/create/rent/house")}>House</button>
						<button onClick={() => navigate("/ad/create/rent/land")}>Land</button>
					</div>
				)}
			</article>
		</section>
	);
};

export default AdCreate;
