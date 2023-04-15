import React, { useState } from "react";
import { useAuthContext } from "../../context/authContext";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";
import "./adForm.scss";

const AdForm = ({ action, type }) => {
	const { auth, setAuth } = useAuthContext();
	const initialState = {
		photos: [],
		uploading: false,
		price: "",
		address: "",
		bedrooms: "",
		bathrooms: "",
		carparks: "",
		landsize: "",
		title: "",
		descreption: "",
		loading: false,
		type,
		action
	};

	const [ad, setAd] = useState(initialState);
	console.log(ad);
	return (
		<form className="ad-form">
			<div className="form-control">
				<textarea
					type="text"
					placeholder="Enter address"
					value={ad.address}
					className=""
					onChange={e => setAd({ ...ad, address: e.target.value })}
				/>
			</div>
			<div className="form-control">
				<CurrencyInput
					placeholder="Enter price"
					defaultValue={ad.price}
					className=""
					onValueChange={value => setAd({ ...ad, price: value })}
				/>
			</div>
			<div className="form-control">
				<input
					type="number"
					min="0"
					placeholder="Enter number of bedrooms"
					value={ad.bedrooms}
					onChange={e => setAd({ ...ad, bedrooms: e.target.value })}
				/>
			</div>
			<div className="form-control">
				<input
					type="number"
					min="0"
					placeholder="Enter number of bathrooms"
					value={ad.bathrooms}
					onChange={e => setAd({ ...ad, bathrooms: e.target.value })}
				/>
			</div>
			<div className="form-control">
				<input
					type="number"
					min="0"
					placeholder="Enter number of carparks"
					value={ad.carparks}
					onChange={e => setAd({ ...ad, carparks: e.target.value })}
				/>
			</div>
			<div className="form-control">
				<input
					type="text"
					placeholder="Size of land"
					value={ad.landsize}
					onChange={e => setAd({ ...ad, landsize: e.target.value })}
				/>
			</div>
			<div className="form-control">
				<input
					type="text"
					placeholder="Enter Title"
					value={ad.title}
					onChange={e => setAd({ ...ad, title: e.target.value })}
				/>
			</div>
			<div className="form-control">
				<textarea
					type="text"
					placeholder="Enter Description"
					value={ad.descreption}
					onChange={e => setAd({ ...ad, descreption: e.target.value })}
				/>
			</div>
			<div className="form-control">
				<ImageUpload
					ad={ad}
					setAd={setAd}
				/>
			</div>

			<button
				className="btn btn-add-form"
				type="submit"
				disabled={ad.loading}
				data-cy="sell-rent-btn"
			>
				Submit
			</button>
		</form>
	);
};

export default AdForm;
