import axios from "axios";

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
