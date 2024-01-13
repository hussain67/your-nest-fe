import React, { useState } from "react";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import CurrencyInput from "react-currency-input-field";

import "./form.scss";
import { useNavigate, useParams } from "react-router-dom";
import { addDocument, storeImage } from "../../utils/firebase/firebaseAd";
import ImageUpload from "./ImageUpload";
import { useAuthContext } from "../../context/authContext";
import Spinner from "../spinner/Spinner";

const AdForm = () => {
	const { auth } = useAuthContext();
	const navigate = useNavigate();
	const { action, type } = useParams();

	const initialState = {
		// photos: [],
		uploading: false,
		price: "",
		address: "",
		bedrooms: "",
		bathrooms: "",
		carparks: "",
		landsize: "",
		title: "",
		description: "",
		type,
		action
	};

	const [images, setImages] = useState([]);
	const [ad, setAd] = useState(initialState);
	const [errors, setErrors] = useState({});
	const [errorMsg, setErrorMsg] = useState(false);
	const [loading, setLoading] = useState(false);

	const isFormValid = type => {
		const errors = {};
		if (ad.address === "") {
			errors.address = true;
		}
		if (ad.price === "") {
			errors.price = true;
		}
		if (type === "house") {
			if (ad.bedrooms === "") {
				errors.bedrooms = true;
			}
			if (ad.bathrooms === "") {
				errors.bathrooms = true;
			}
			if (ad.carparks === "") {
				errors.carparks = true;
			}
		}
		if (ad.landsize === "") {
			errors.landsize = true;
		}
		if (ad.title === "") {
			errors.title = true;
		}
		if (ad.description === "") {
			errors.description = true;
		}

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	let photos = [];
	const uploadPhoto = async () => {
		photos = await Promise.all([...images].map(image => storeImage(auth.uid, image))).catch(error => {
			return;
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!isFormValid(type)) {
			setErrorMsg(true);
			return;
		}
		setLoading(true);
		await uploadPhoto();
		let geolocation = {};
		const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${ad.address}&key=${process.env.REACT_APP_GOOGLE_PLACE_KEY}`);

		const data = await response.json();

		geolocation.lat = data.results[0]?.geometry.location.lat;
		geolocation.lng = data.results[0]?.geometry.location.lng;

		const adToStore = { ...ad, userRef: auth.uid, geolocation, photos };
		if (type === "land") {
			delete adToStore.bedrooms;
			delete adToStore.bathrooms;
			delete adToStore.carparks;
		}

		try {
			await addDocument("listings", adToStore);
			setLoading(false);
			navigate("/");
		} catch (eror) {}
	};
	if (loading) return <Spinner />;
	return (
		<form
			className=" form page-section"
			onSubmit={handleSubmit}
		>
			<h1 className="form-title">
				{action} {type}
			</h1>
			<div>{errorMsg && <div className="error-msg form-control">Please fill all the fields properly</div>}</div>
			<div className={errors?.address ? "error form-control" : "form-control"}>
				<GooglePlacesAutocomplete
					apiKey={process.env.REACT_APP_GOOGLE_PLACE_KEY}
					apiOptions={{
						region: "west-midlands",
						language: "en"
					}}
					autocompletionRequest={{
						componentRestrictions: {
							country: ["GB"]
						}
					}}
					selectProps={{
						defaultInputValue: ad?.address,

						placeholder: "Search for address",

						onChange: ({ value }) => {
							setAd({ ...ad, address: value.description });
						},
						onBlur: () => {
							if (ad.address !== "") {
								setErrors({ ...errors, address: false });
							}
						}
					}}
				/>
			</div>
			<div className={"form-control"}>
				<CurrencyInput
					placeholder="Enter price"
					defaultValue={ad.price}
					onValueChange={value => setAd({ ...ad, price: value })}
					className={errors.price ? "error" : ""}
					onBlur={() => {
						if (ad.price !== "") {
							setErrors({ ...errors, price: false });
						}
					}}
				/>
			</div>
			{type === "house" ? (
				<>
					<div className="form-control">
						<input
							type="number"
							min="0"
							placeholder="Enter number of bedrooms"
							value={ad.bedrooms}
							onChange={e => setAd({ ...ad, bedrooms: e.target.value })}
							className={errors.bedrooms ? "error" : ""}
							onBlur={() => {
								if (ad.bedrooms !== "") {
									setErrors({ ...errors, bedrooms: false });
								}
							}}
						/>
					</div>
					<div className="form-control">
						<input
							type="number"
							min="0"
							placeholder="Enter number of bathrooms"
							value={ad.bathrooms}
							onChange={e => setAd({ ...ad, bathrooms: e.target.value })}
							className={errors.bathrooms ? "error" : ""}
							onBlur={() => {
								if (ad.bathrooms !== "") {
									setErrors({ ...errors, bathrooms: false });
								}
							}}
						/>
					</div>
					<div className="form-control">
						<input
							type="number"
							min="0"
							placeholder="Enter number of carparks"
							value={ad.carparks}
							onChange={e => setAd({ ...ad, carparks: e.target.value })}
							className={errors.carparks ? "error" : ""}
							onBlur={() => {
								if (ad.carparks !== "") {
									setErrors({ ...errors, carparks: false });
								}
							}}
						/>
					</div>
				</>
			) : (
				""
			)}
			<div className="form-control">
				<input
					type="text"
					placeholder="Size of land"
					value={ad.landsize}
					onChange={e => setAd({ ...ad, landsize: e.target.value })}
					className={errors.landsize ? "error" : ""}
					onBlur={() => {
						if (ad.landsize !== "") {
							setErrors({ ...errors, landsize: false });
						}
					}}
				/>
			</div>
			<div className="form-control">
				<input
					type="text"
					placeholder="Enter title"
					value={ad.title}
					onChange={e => setAd({ ...ad, title: e.target.value })}
					className={errors.title ? "error" : ""}
					onBlur={() => {
						if (ad.title !== "") {
							setErrors({ ...errors, title: false });
						}
					}}
				/>
			</div>
			<div className="form-control">
				<textarea
					type="text"
					placeholder="Enter description"
					value={ad.description}
					onChange={e => setAd({ ...ad, description: e.target.value })}
					className={errors.description ? "error" : ""}
					onBlur={() => {
						if (ad.description !== "") {
							setErrors({ ...errors, description: false });
						}
					}}
				/>
			</div>

			<div className="form-control">
				{
					<ImageUpload
						ad={ad}
						setAd={setAd}
						action="create"
						images={images}
						setImages={setImages}
					/>
				}
			</div>

			<button
				className="btn btn-form-submit"
				type="submit"
				disabled={loading}
				data-cy=""
			>
				{loading ? "Saving..." : "Submit"}
			</button>
		</form>
	);
};

export default AdForm;
