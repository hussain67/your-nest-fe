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
		const { data } = await axios.post("/ad/create-ad", ad);
		//console.log(data);
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
export const updateAd = async ad => {
	try {
		const { data } = await axios.put(`/ad/update-ad/${ad._id}`, ad);
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

export const getAds = async () => {
	try {
		const { data } = await axios.get("/ad/get-ads");
		return data;
	} catch (error) {}
};

export const getAd = async slug => {
	try {
		const { data } = await axios.get(`/ad/get-ad/${slug}`);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const userAds = async page => {
	try {
		const { data } = await axios.get(`/ad/user-ads/${page}`);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const contactSeller = async info => {
	try {
		const { data } = await axios.post("/ad/contact-seller", info);
		//console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
};
