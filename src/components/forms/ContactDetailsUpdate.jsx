import React, { useState } from "react";
import { auth } from "../../utils/firebase/firebaseUtils";
import { toast } from "react-toastify";
import FormInput from "./FormInput";
import "../../pages/auth/login-register/loginRegister.scss";
import "./contactDetailsUpdate.scss";
import Spinner from "../spinner/Spinner";
import { updateUserProfile } from "../../utils/firebase/firebaseAuth";

const ContactDetailsUpdate = ({ setShowElement }) => {
	const user = auth.currentUser;

	const initialInput = {
		name: user.displayName
	};
	const [input, setInput] = useState(initialInput);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const { name } = input;

	const handleChange = e => {
		const { name, value } = e.target;
		setInput({
			...input,
			[name]: value
		});
		setErrors(errors => ({ ...errors, [name]: "" }));
	};
	const isFormValid = () => {
		let errors = {};
		console.log(errors);
		if (name.length < 2) {
			errors.name = "Name should be at least two characters long";
		}

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleUpdate = async e => {
		e.preventDefault();

		if (!isFormValid()) return;
		setLoading(true);
		try {
			await updateUserProfile({ displayName: name });

			toast.success("Profile updated");
		} catch (error) {
			toast.error("Profile not updated");
		}
		setLoading(false);
	};

	return (
		<article className="login-register-form">
			{errors && <p className="auth-error">{errors.msg}</p>}
			<form>
				<FormInput
					label="Name"
					name="name"
					type="text"
					value={input.name}
					onChange={handleChange}
					error={errors.name}
					className="update-background"
				/>

				<div className="update">
					{loading && <Spinner size={"small"} />}

					{!loading && (
						<div className="update-btn-container">
							{" "}
							<span
								className="btn-cancel"
								onClick={() => setShowElement(false)}
							>
								Cancel
							</span>
							<span
								className="btn-update"
								onClick={handleUpdate}
							>
								Save update
							</span>
						</div>
					)}
				</div>
			</form>
		</article>
	);
};

export default ContactDetailsUpdate;
