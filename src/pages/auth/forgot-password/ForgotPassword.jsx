import React, { useState } from "react";
import FormInput from "../component-form-input/FormInput";
import validator from "validator";
import "./forgotPassword.scss";
import { forgotPassword } from "../../../utils/api/authApi";
import { Link } from "react-router-dom";
//import { toast } from "react-toastify";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [emailInfo, setEmailInfo] = useState("");

	const handleChange = e => {
		setEmail(e.target.value);
	};

	const isFormValid = () => {
		let errors = {};
		if (!validator.isEmail(email)) {
			errors.email = "Valid email is required";
		}

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (!isFormValid()) return;
		setLoading(true);
		try {
			const { status } = await forgotPassword(email);

			if (status === "Success") {
				setEmailInfo("Please check your email for password reset link");
			}
			setEmail("");
		} catch (error) {}
		setLoading(false);
	};

	if (emailInfo) {
		return (
			<p className="email-info">
				<span className="email-info-text">{emailInfo}</span>{" "}
			</p>
		);
	}
	return (
		<section className="login-register">
			<article className="login-register-form">
				{errors && <p className="auth-error">{errors.msg}</p>}
				<form onSubmit={handleSubmit}>
					<FormInput
						label="Email Address"
						name="email"
						type="email"
						value={email}
						onChange={handleChange}
						error={errors.email}
					/>

					<div className="container-btn-submit">
						<button
							className="btn btn-submit"
							type="submit"
							disabled={loading}
							data-cy="login-signup-btn"
						>
							{loading ? "Waiting..." : "Submit"}
						</button>
					</div>
				</form>
				<div className="login-register-footer">
					<p>
						<Link to="/account/login-register"> Back to login</Link>
					</p>
				</div>
			</article>
		</section>
	);
};

export default ForgotPassword;
