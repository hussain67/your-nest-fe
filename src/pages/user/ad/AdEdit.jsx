import React, { useEffect, useState } from "react";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import CurrencyInput from "react-currency-input-field";

import "../../../components/forms/form.scss";

import { useNavigate, useParams } from "react-router-dom";
import { updateAd, getAd } from "../../../utils/api/adApi";
import ImageUpload from "../../../components/forms/ImageUpload";
import { useAuthContext } from "../../../context/authContext";

const AdEdit = () => {
	const { slug } = useParams();
	const { auth } = useAuthContext();
	const navigate = useNavigate();

	const [ad, setAd] = useState();
	const [errors, setErrors] = useState({});
	const [errorMsg, setErrorMsg] = useState(false);

	const isAdvertiser = ad?.postedBy?._id === auth.user?._id;

	useEffect(() => {
		const fetchAd = async () => {
			const { ad } = await getAd(slug);
			setAd(ad[0]);
		};
		fetchAd();
	}, [slug]);

	const isFormValid = type => {
		const errors = {};
		if (ad.address === "") {
			errors.address = true;
		}
		if (ad.price === "") {
			errors.price = true;
		}
		if (type === "House") {
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
		if (ad.photos.length === 0) {
			errors.photos = true;
		}

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!isFormValid(ad?.type)) {
			setErrorMsg(true);
			return;
		}

		setAd({ ...ad, loading: true });
		try {
			const data = await updateAd(ad);
			console.log(data);
			navigate("/");
		} catch (eror) {}
		setAd({ ...ad, loading: false });
	};
	return (
		ad &&
		isAdvertiser && (
			<form
				className="form"
				onSubmit={handleSubmit}
			>
				{errorMsg && <div className="error-msg form-control">Please fill all the fields properly</div>}
				<div className={errors?.address ? "error form-control" : "form-control"}>
					<GooglePlacesAutocomplete
						apiKey={process.env.REACT_APP_GOOGLE_PLACE_KEY}
						apiOptions={{
							region: "west-midlands",
							language: "en"
						}}
						autocompletionRequest={{
							// bounds: [
							// 	{ lat: 50, lng: 50 },
							// 	{ lat: 100, lng: 100 }
							// ],
							componentRestrictions: {
								country: ["GB"]
							}
						}}
						selectProps={{
							defaultInputValue: ad?.address,

							placeholder: "Search for address",

							onChange: ({ value }) => {
								setAd({ ...ad, address: value.description });
								//console.log(value);
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
				{ad?.type === "House" ? (
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
					<div className={errors.photos ? "error" : ""}>
						<ImageUpload
							ad={ad}
							setAd={setAd}
						/>
					</div>
				</div>

				<button
					className="btn btn-form-submit"
					type="submit"
					disabled={ad.loading}
					data-cy=""
				>
					{ad.loading ? "Saving..." : "Submit"}
				</button>
			</form>
		)
	);
};

export default AdEdit;
