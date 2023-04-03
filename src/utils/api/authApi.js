import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:8000/api/v1";

export const preRegister = async (name, email, password) => {
	try {
		const { data } = await axios.post("/auth/pre-register", { name, email, password });
		//console.log(data);
		if (data.error) {
			toast.error(data.error);
		}
		return data;
	} catch (error) {
		toast.error("Something went wrong, try again latter");
	}
};

export const register = async token => {
	try {
		const { data } = await axios.post(`/auth/register`, { token });
		if (data?.error) {
			toast.error(data.error);
		}
		toast.success(`Welcome ${data.user.name}`);
		return data;
	} catch (error) {}
};

export const logIn = async (email, password) => {
	try {
		const { data } = await axios.post(`/auth/login`, { email, password });
		if (data.error) {
			toast.error(data.error);
			return data;
		}
		toast.success(`Welcome ${data.user.name}`);
		return data;
	} catch (error) {}
};
