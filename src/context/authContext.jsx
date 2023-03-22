import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		token: "",
		refreshToken: ""
	});
	const value = { auth, setAuth };
	return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

const useAuthContext = () => useContext(authContext);
export { AuthProvider, useAuthContext };
