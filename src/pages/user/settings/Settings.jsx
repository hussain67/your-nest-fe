import React, { useState } from "react";
import "../../../components/forms/form.scss";
import "./setting.scss";
import { updatePassword } from "../../../utils/api/authApi";

const Settings = () => {
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const handleChange = e => {
		setPassword(e.target.value);
	};

	const isPasswordValid = () => {
		let errors = {};
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
		//console.log(isPasswordValid);
		if (!isPasswordValid()) return;
		try {
			setLoading(true);
			const resp = await updatePassword(password);
			console.log(resp);
		} catch (error) {}
		setLoading(false);
	};
	return (
		<article className="settings">
			<form
				onSubmit={handleSubmit}
				className="form"
			>
				<h2 className="form-title"> Settings: Update password</h2>
				{errors.password && <p className="error-msg">{errors.password}</p>}
				<div className="form-control password-input">
					<input
						type="text"
						placeholder="Enter new password"
						value={password}
						onChange={handleChange}
					/>
				</div>
				<button
					className="btn btn-form-submit"
					type="submit"
					disabled={loading}
					data-cy="password-submit-btn"
				>
					{loading ? "Processing" : "Update password"}
				</button>
			</form>
		</article>
	);
};

export default Settings;
