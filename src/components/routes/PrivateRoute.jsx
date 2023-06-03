import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { getCurrentUser } from "../../utils/api/authApi";
import Redirect from "./Redirect";

const PrivateRoute = () => {
	const { auth } = useAuthContext();

	const [status, setStatus] = useState(false);

	const validateUser = async token => {
		try {
			const resp = await getCurrentUser(token);
			if (resp) {
				setStatus(true);
			}
		} catch (error) {
			setStatus(false);
		}
	};

	useEffect(() => {
		if (auth.token) {
			validateUser(auth.token);
		}
	}, [auth.token]);

	return status ? <Outlet /> : <Redirect />;
};

export default PrivateRoute;
