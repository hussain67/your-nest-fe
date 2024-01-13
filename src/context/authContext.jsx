import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { onAuthStateChangedListener } from "../utils/firebase/firebaseAuth";

const authContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(user => {
			setAuth(user);
		});
		return unsubscribe;
	}, []);

	axios.defaults.baseURL = process.env.REACT_APP_BASEURL;

	const value = { auth, setAuth };
	return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

const useAuthContext = () => useContext(authContext);
export { AuthProvider, useAuthContext };
