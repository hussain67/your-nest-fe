import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
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

	const value = { auth, setAuth };
	return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

const useAuthContext = () => useContext(authContext);
export { AuthProvider, useAuthContext };
