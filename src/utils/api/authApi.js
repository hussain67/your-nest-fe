import axios from "axios";
//import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:8000/api/v1";

export const preRegister = async (name, email, password) => {
	console.log(email, password);
	try {
		const response = await axios.post("/auth/pre-register", { name, email, password });
		//console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return error;
	}
};
