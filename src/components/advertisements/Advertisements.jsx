import { Link } from "react-router-dom";
import AdCard from "../cards/AdCard";
import "./advertisements.scss";
import AdHeading from "./AdHeading";
function Advertisements({ ads, action, type }) {
	if (!ads?.length) return;
	return (
		<article>
			<div className="action">
				<AdHeading
					action={action}
					type={type}
					noAds={ads.length}
				/>
			</div>
			<div className="card-container">
				{ads?.map(ad => {
					return (
						<AdCard
							ad={ad}
							key={ad.id}
						/>
					);
				})}
			</div>
			<div className="show-more">
				<Link to={`/category/${type}/${action}`}>{ads.length === 3 && <span>Show more</span>}</Link>
			</div>
		</article>
	);
}

export default Advertisements;
