import React, { useState } from "react";
import FormInput from "../../../components/forms/FormInput";
// import validator from "validator";
import "../login-register/loginRegister.scss";
import { useLocation, useNavigate } from "react-router-dom";

import "./resetPassword.scss";
import Spinner from "../../../components/spinner/Spinner";
import { resetPassword } from "../../../utils/firebase/firebaseAuth";
import { toast } from "react-toastify";

function useQuery() {
	const location = useLocation();
	return new URLSearchParams(location.search);
}

const ResetPassword = () => {
	const query = useQuery();
	const oobCode = query.get("oobCode");
	const navigate = useNavigate();

	const initialInput = {
		password: "",
		confirmPassword: ""
	};
	const [input, setInput] = useState(initialInput);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const { password, confirmPassword } = input;

	const handleChange = e => {
		const { name, value } = e.target;
		setInput({
			...input,
			[name]: value
		});
	};

	const isFormValid = () => {
		let errors = {};
		console.log(errors);

		// Need attention
		//if (!validator.isPassword(password)) {
		if (password.length === 0) {
			errors.password = "Password field is empty";
		}
		if (password.length > 0 && password.length < 6) {
			errors.password = "Password should contain atleast 6 character";
		}
		if (confirmPassword.length === 0) {
			errors.confirmPassword = "Confirm password is required";
		}

		if (confirmPassword.length > 0 && confirmPassword !== password) {
			errors.confirmPassword = "Passwords do not match, try again";
		}

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!isFormValid()) return;

		setLoading(true);
		try {
			await resetPassword(oobCode, password);
			setInput(initialInput);
			toast.success("Pasword updated");
			navigate("/account/login");
		} catch (error) {
			toast.failure("Did not updated password");
		}
		setLoading(false);
	};

	return (
		<section className="login-register">
			<h1 className="reset-heading">Rreset Password</h1>
			<article className="login-register-form">
				{errors && <p className="auth-error">{errors.msg}</p>}
				<form onSubmit={handleSubmit}>
					<FormInput
						label="Password"
						name="password"
						type="password"
						value={input.password}
						onChange={handleChange}
						error={errors.password}
						placeholder="Enter new password"
					/>
					<FormInput
						label="Confirm password"
						name="confirmPassword"
						type="password"
						value={input.confirmPassword}
						onChange={handleChange}
						error={errors.confirmPassword}
						placeholder="Confirm new password"
					/>
					<div className="container-btn-submit">
						<button
							className="btn btn-submit"
							type="submit"
							disabled={loading}
						>
							{loading ? <Spinner size={"small"} /> : "Submit"}
						</button>
					</div>
				</form>
			</article>
		</section>
	);
};

export default ResetPassword;
