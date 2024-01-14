import React, { useState } from "react";
// import FormInput from "../component-form-input/FormInput";
import FormInput from "../../../components/forms/FormInput";
import validator from "validator";
import "./loginRegister.scss";
import { Link, useNavigate } from "react-router-dom";
import { signInAuthUserWithEmailAndPassword } from "../../../utils/firebase/firebaseAuth";
import { toast } from "react-toastify";
// import { auth } from "../../../utils/firebase/firebaseUtils";

const LoginRegister = () => {
	const navigate = useNavigate();

	const initialInput = {
		email: "",
		password: "",
		confirmPassword: ""
	};
	const [input, setInput] = useState(initialInput);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [info, setInfo] = useState("");

	const { email, password } = input;

	const handleChange = e => {
		const { name, value } = e.target;
		setInput({
			...input,
			[name]: value
		});
		setErrors({ ...errors, [name]: false });
	};
	const isFormValid = isRegistered => {
		let errors = {};

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

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async e => {
		e.preventDefault();

		//Login
		if (!isFormValid()) return;
		setLoading(true);
		try {
			const { user } = await signInAuthUserWithEmailAndPassword(email, password);
			if (user) {
				toast.success("You have successfully logged in");
				navigate("/");
			}
		} catch (error) {
			if (error.code === "auth/invalid-credential") {
				setInfo("Are you registered? if Registered provide correct Email and password");
				setTimeout(() => {
					setInfo("");
				}, 2500);
			}
			setLoading(false);
		}
		setLoading(false);
	};

	if (info) {
		return (
			<p className="email-info">
				<span className="email-info-text">{info}</span>{" "}
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

					<div className="container-btn-submit">
						<button
							className="btn btn-submit"
							type="submit"
							disabled={loading}
							data-cy="login-signup-btn"
						>
							{loading ? "Waiting..." : "LOG IN"}
						</button>
					</div>
				</form>
				<div className="login-register-footer">
					<p className="toggle-register">
						Not registered yet?
						<Link to="/account/register"> Register</Link>
					</p>

					<p>
						Forgot your password?
						<Link to="/account/forgot-password"> Reset Password</Link>
					</p>
				</div>
			</article>
		</section>
	);
};

export default LoginRegister;
