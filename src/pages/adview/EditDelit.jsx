import { Link, useNavigate } from "react-router-dom";
import { deleteAd, deleteImage } from "../../utils/firebase/firebaseAd";
import "./adView.scss";
function EditDelit({ ad, slug }) {
	const navigate = useNavigate();
	const handleDelete = async () => {
		await deleteAd(slug);
		await ad?.photos?.map(photo => deleteImage(photo));
		navigate("/");
	};
	return (
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
	);
}

export default EditDelit;
