import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
import { accessAccount } from "../../../utils/api/authApi";
import "./accessAccount.scss";

const AccessAccount = () => {
	const navigate = useNavigate();
	const { token } = useParams();
	const { setAuth } = useAuthContext();

	useEffect(() => {
		const callAccessAccount = async () => {
			if (token) {
				const response = await accessAccount(token);
				setAuth(response);
				localStorage.setItem("auth", JSON.stringify(response));
			}
		};
		callAccessAccount();
		navigate("/");
	}, [token, setAuth, navigate]);

	return (
		<div className="account-activate">
			<h3>Please wait....</h3>
		</div>
	);
};
export default AccessAccount;
