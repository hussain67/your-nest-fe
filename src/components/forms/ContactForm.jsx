import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { contactSeller } from "../../utils/api/adApi";
import "./form.scss";

const ContactForm = ({ ad }) => {
	const { auth } = useAuthContext();
	//console.log(auth);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [message, setMessage] = useState();
	const [phone, setPhone] = useState();
	const [loading, setLoading] = useState();
	//console.log(ad);
	const loggedIn = auth.user !== null && auth.token !== null;

	useEffect(() => {
		if (loggedIn) {
			setName(auth.user.name);
			setEmail(auth.user.email);
			setPhone(auth.user.phone);
		}
	}, [loggedIn]);

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			const info = { name, email, phone, message, adId: ad._id };
			const data = await contactSeller(info);
		} catch (error) {}
	};

	return (
		<article className="form">
			<h3 className="title">Contact {ad?.postedBy?.name}</h3>
			<form onSubmit={handleSubmit}>
				<textarea
					name="message"
					placeholder="Enter your message"
					value={message}
					autoFocus={true}
					onChange={e => {
						setMessage(e.target.value);
					}}
					disabled={!loggedIn}
				></textarea>
				<div className="form-control">
					<input
						type="text"
						name="name"
						placeholder="Enter your name"
						value={name}
						onChange={e => {
							setName(e.target.value);
						}}
						disabled={!loggedIn}
					/>
				</div>
				<div className="form-control">
					<input
						type="email"
						name="email"
						placeholder="Enter your email"
						value={email}
						onChange={e => {
							setEmail(e.target.value);
						}}
						disabled={!loggedIn}
					/>
				</div>
				<div className="form-control">
					<input
						type="text"
						name="phone"
						placeholder="Enter your phone number"
						value={phone}
						onChange={e => {
							setPhone(e.target.value);
						}}
						disabled={!loggedIn}
					/>
				</div>
				<button
					className="btn btn-form-submit"
					type="submit"
					disabled={!name || !email || !message || loading}
					data-cy=""
				>
					{loggedIn ? (loading ? "Please wait..." : "Send enquiry") : "Login to send enquiry"}
					{}
				</button>
			</form>
		</article>
	);
};

export default ContactForm;
