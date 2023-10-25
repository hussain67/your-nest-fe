import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const authContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		token: "",
		refreshToken: ""
	});

	useEffect(() => {
		const data = localStorage.getItem("auth");
		if (data) {
			setAuth(JSON.parse(data));
		}
	}, []);

	axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
	axios.defaults.headers.common["Authorization"] = auth?.token;
	axios.defaults.headers.common["refresh_token"] = auth?.refreshToken;
	axios.interceptors.response.use(
		res => {
			return res;
		},
		async err => {
			const originalConfig = err.config;

			if (err.response) {
				// token is expired
				if (err.response.status === 401 && !originalConfig._retry) {
					originalConfig._retry = true;

					try {
						const { data } = await axios.get("/auth/refresh-token");
						axios.defaults.headers.common["token"] = data.token;
						axios.defaults.headers.common["refresh_token"] = data.refreshToken;

						setAuth(data);
						localStorage.setItem("auth", JSON.stringify(data));

						return axios(originalConfig);
					} catch (_error) {
						if (_error.response && _error.response.data) {
							return Promise.reject(_error.response.data);
						}

						return Promise.reject(_error);
					}
				}

				if (err.response.status === 403 && err.response.data) {
					return Promise.reject(err.response.data);
				}
			}

			return Promise.reject(err);
		}
	);
	const value = { auth, setAuth };
	return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

const useAuthContext = () => useContext(authContext);
export { AuthProvider, useAuthContext };
