import React, { useState } from "react";
import FormInput from "../../../components/forms/FormInput";
import validator from "validator";
import "../login-register/loginRegister.scss";
import { forgotPassword } from "../../../utils/firebase/firebaseAuth";
import { toast } from "react-toastify";

const ForgotPassword = () => {
	const initialInput = {
		email: ""
	};
	const [input, setInput] = useState(initialInput);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const { email } = input;
	const handleChange = e => {
		const { name, value } = e.target;
		setInput({
			[name]: value
		});
	};
	const isFormValid = isRegistered => {
		let errors = {};
		console.log(errors);

		if (!validator.isEmail(email)) {
			errors.email = "Valid email is required";
		}

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async e => {
		e.preventDefault();

		//Login
		if (!isFormValid()) return;
		setLoading(true);

		try {
			await forgotPassword(email);
			toast.success("Please Check your email");
		} catch (error) {
			toast.error("Could not send reset password");
		}

		setLoading(false);
	};

	return (
		<section className="login-register">
			<article className="login-register-form">
				{errors && <p className="auth-error">{errors.msg}</p>}
				<form onSubmit={handleSubmit}>
					<FormInput
						label="Email Address"
						name="email"
						type="email"
						value={input.email}
						onChange={handleChange}
						error={errors.email}
					/>

					<div className="container-btn-submit">
						<button
							className="btn btn-submit"
							type="submit"
							disabled={loading}
						>
							{loading ? "Waiting..." : "Submit"}
						</button>
					</div>
				</form>
			</article>
		</section>
	);
};

export default ForgotPassword;
