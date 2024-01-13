import React, { useState } from "react";
import FormInput from "../../../components/forms/FormInput";
import validator from "validator";
import "./loginRegister.scss";
import { useNavigate } from "react-router-dom";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, updateUserProfile } from "../../../utils/firebase/firebaseAuth";

const LoginRegister = () => {
	const navigate = useNavigate();
	const initialInput = {
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	};
	const [input, setInput] = useState(initialInput);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [info, setInfo] = useState("");

	const { name, email, password, confirmPassword } = input;

	const handleChange = e => {
		const { name, value } = e.target;
		setInput({
			...input,
			[name]: value
		});
		setErrors({ ...errors, [name]: false });
	};
	const isFormValid = () => {
		let errors = {};

		if (name.length < 2) {
			errors.name = "Name should be at least two characters long";
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

		//Registration
		setLoading(true);
		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);

			if (user) {
				await updateUserProfile({ displayName: name });

				await createUserDocumentFromAuth(user, { displayName: name });
				setTimeout(() => {
					navigate("/");
				}, 2000);
			}
			setInput(initialInput);
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				setInfo("Email is already in use, try another Email");
				setTimeout(() => {
					setInfo("");
				}, 2000);
			}
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
						label="Name"
						name="name"
						type="text"
						value={input.name}
						onChange={handleChange}
						error={errors.name}
					/>

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

					<FormInput
						label="Confirm password"
						name="confirmPassword"
						type="password"
						value={input.confirmPassword}
						onChange={handleChange}
						error={errors.confirmPassword}
					/>

					<div className="container-btn-submit">
						<button
							className="btn btn-submit"
							type="submit"
							disabled={loading}
							data-cy="login-signup-btn"
						>
							{loading ? "Waiting..." : "SIGN UP"}
						</button>
					</div>
				</form>
				<div className="login-register-footer">
					<p className="toggle-register">
						Already registered?
						<span
							onClick={() => {
								navigate("/account/login");
							}}
						>
							{" "}
							Log In
						</span>
					</p>
				</div>
			</article>
		</section>
	);
};

export default LoginRegister;
