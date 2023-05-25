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
		<section className="page-section">
			<article className="ad-create">
				<div>
					<button
						className="sell-btn"
						onClick={handleSell}
					>
						Sell
					</button>
					{sell && (
						<div className="btn-container">
							<button
								data-cy="btn-sell-house"
								onClick={() => navigate("/ad/create/sell/house")}
							>
								House
							</button>
							<button
								data-cy="btn-sell-land"
								onClick={() => navigate("/ad/create/sell/land")}
							>
								Land
							</button>
						</div>
					)}
				</div>
				<div>
					<button
						className="rent-btn"
						onClick={handleRent}
					>
						Rent
					</button>
					{rent && (
						<div className="btn-container">
							<button
								data-cy="btn-rent-house"
								onClick={() => navigate("/ad/create/rent/house")}
							>
								House
							</button>
							<button
								data-cy="btn-rent-land"
								onClick={() => navigate("/ad/create/rent/land")}
							>
								Land
							</button>
						</div>
					)}
				</div>
			</article>
		</section>
	);
};

export default AdCreate;
