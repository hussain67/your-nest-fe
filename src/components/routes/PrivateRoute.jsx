import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import Redirect from "./Redirect";

const PrivateRoute = () => {
	const { auth } = useAuthContext();

	return auth ? <Outlet /> : <Redirect />;
};

export default PrivateRoute;
