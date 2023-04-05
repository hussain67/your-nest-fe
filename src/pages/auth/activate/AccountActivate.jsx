import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
import { register } from "../../../utils/api/authApi";
import "./accountActivate.scss";

const AccountActivate = () => {
	const navigate = useNavigate();
	const { token } = useParams();
	const { setAuth } = useAuthContext();

	useEffect(() => {
		const callregister = async () => {
			if (token) {
				const response = await register(token);
				setAuth(response);
				localStorage.setItem("auth", JSON.stringify(response));
			}
		};
		callregister();
		navigate("/");
	}, [token, setAuth, navigate]);

	return (
		<div className="account-activate">
			<h3>Wait while activating your account</h3>
		</div>
	);
};

export default AccountActivate;
