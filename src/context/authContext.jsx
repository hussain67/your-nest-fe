import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		token: "",
		refreshToken: ""
	});
	console.log(auth, "AUTH");
	useEffect(() => {
		const data = localStorage.getItem("auth");
		if (data) {
			setAuth(JSON.parse(data));
		}
	}, []);
	//console.log(auth);
	const value = { auth, setAuth };
	return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

const useAuthContext = () => useContext(authContext);
export { AuthProvider, useAuthContext };
