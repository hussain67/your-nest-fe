import axios from "axios";
import { toast } from "react-toastify";

export const uploadImage = async uri => {
	try {
		const { data } = await axios.post("/ad/upload-image", {
			image: uri
		});
		//console.log(data);
		return data;
	} catch (error) {}
};

export const removeImage = async photo => {
	const { Bucket, Key } = photo;
	try {
		const { data } = await axios.post("/ad/remove-image", { Bucket, Key });
		return data;
	} catch (error) {
		return error;
	}
};

export const createAd = async ad => {
	try {
		const { data } = axios.post("/ad/create-ad", ad);
		console.log(data);
		if (data?.error) {
			toast.error(data.error);
		} else {
			toast.success("Success");
		}
		return data;
	} catch (error) {
		console.log(error);
	}
};
