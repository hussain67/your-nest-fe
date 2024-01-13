import React, { useEffect, useState } from "react";
import "./form.scss";
import { getAdvertiser } from "../../utils/firebase/firebaseAd";

const ContactForm = ({ ad }) => {
	const [message, setMessage] = useState("");
	const [advertiser, setAdvertiser] = useState();

	useEffect(() => {
		const advertiserInfo = async () => {
			const advertiser = await getAdvertiser(ad?.userRef);
			setAdvertiser(advertiser);
		};
		advertiserInfo();
	}, [ad?.userRef]);

	return (
		<article className="form">
			<h3 className="form-title">Contact {advertiser?.displayName}</h3>
			<textarea
				name="message"
				placeholder="Enter your message"
				value={message}
				autoFocus={true}
				onChange={e => {
					setMessage(e.target.value);
				}}
			></textarea>

			<a href={`mailto:${advertiser?.email}?Subject=${ad.type} to ${ad.action}, ${ad.address}&body=${message}`}>
				<button
					className="btn btn-form-submit"
					type="submit"
				>
					Submit Enquary
				</button>
			</a>
		</article>
	);
};

export default ContactForm;
