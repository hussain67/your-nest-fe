import React, { useState } from "react";
import FormInput from "./FormInput";
import validator from "validator";
import "./loginRegister.scss";
import { preRegister } from "../../../utils/api/authApi";
import { Link, useNavigate } from "react-router-dom";

const LoginRegister = () => {
	const navigate = useNavigate();
	const navigateToHomePage = () => {
		navigate("/");
	};
	const initialInput = {
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	};
	const [isRegistered, setIsRegistered] = useState(true);
	const [input, setInput] = useState(initialInput);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [emailInfo, setEmailInfo] = useState("");
	const { name, email, password, confirmPassword } = input;

	const handleChange = e => {
		const { name, value } = e.target;
		setInput({
			...input,
			[name]: value
		});
	};
	const isFormValid = isRegistered => {
		let errors = {};

		if (!isRegistered) {
			if (name.length < 2) {
				errors.name = "Name should be at least two characters long";
			}
		}
		if (!validator.isEmail(email)) {
			errors.email = "Valid email is required";
		}
		// Need attention
		//if (!validator.isPassword(password)) {
		if (password.length === 0) {
			errors.password = "Password field is empty";
		}
		if (password.length > 0 && password.length < 6) {
			errors.password = "Password should contain atleast 6 character";
		}
		if (!isRegistered) {
			if (confirmPassword.length === 0) {
				errors.confirmPassword = "Confirm password is required";
			}

			if (confirmPassword.length > 0 && confirmPassword !== password) {
				errors.confirmPassword = "Passwords do not match, try again";
			}
		}

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (!isRegistered) {
			if (!isFormValid(!isRegistered)) return;
			setLoading(true);
			try {
				const { status } = await preRegister(name, email, password);
				console.log(status);
				if (status === "OK") {
					setEmailInfo("Please check your email to verify your account");
				}
			} catch (error) {}
			setLoading(false);
		}
		if (isRegistered) {
			isFormValid(isRegistered);
		}
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
					{!isRegistered && (
						<FormInput
							label="Name"
							name="name"
							type="text"
							value={input.name}
							onChange={handleChange}
							error={errors.name}
						/>
					)}
					<FormInput
						label="Email Address"
						name="email"
						type="email"
						value={input.email}
						onChange={handleChange}
						error={errors.email}
					/>
					<FormInput
						label="Password"
						name="password"
						type="password"
						value={input.password}
						onChange={handleChange}
						error={errors.password}
					/>
					{!isRegistered && (
						<FormInput
							label="Confirm password"
							name="confirmPassword"
							type="password"
							value={input.confirmPassword}
							onChange={handleChange}
							error={errors.confirmPassword}
						/>
					)}

					<div className="container-btn-submit">
						<button
							className="btn btn-submit"
							type="submit"
							disabled={loading}
							data-cy="login-signup-btn"
						>
							{loading ? "Waiting..." : isRegistered ? "LOG IN" : "SIGN UP"}
						</button>
					</div>
				</form>
				<div className="login-register-footer">
					<p className="toggle-register">
						{isRegistered ? "Not registered yet? " : "Already registered? "}
						<span
							onClick={() => {
								setIsRegistered(!isRegistered);
								setErrors({});
							}}
							data-cy="login-register-span"
						>
							{isRegistered ? " Register" : " Log In"}
						</span>
					</p>

					{isRegistered && (
						<p>
							Forgot your password?
							<Link to="./forgot-password"> Reset Password</Link>
						</p>
					)}
				</div>
			</article>
		</section>
	);
};

export default LoginRegister;
