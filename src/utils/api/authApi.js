import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:8000/api/v1";

export const preRegister = async (name, email, password) => {
	try {
		const { data } = await axios.post("/auth/pre-register", { name, email, password });
		console.log(data);
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
		const response = await axios.post(`/auth/register`, { token });
		return response.data;
	} catch (error) {}
};
