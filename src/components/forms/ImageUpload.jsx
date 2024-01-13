import { Avatar } from "antd";
import { useState } from "react";
import "./imageUpload.scss";
function ImageUpload({ ad, setAd, action, images, setImages }) {
	const [imageUrls, setImageUrls] = useState([]);

	const handleSelectedImages = e => {
		const selectedImages = e.target.files;

		const selectedImageUrls = [...selectedImages].map(image => {
			return URL.createObjectURL(image);
		});
		setImageUrls([...imageUrls, ...selectedImageUrls]);

		setImages(images => {
			return [...images, ...selectedImages];
		});
	};

	const removePhoto = file => {
		const urls = imageUrls.filter(img => img !== file);
		setImageUrls(urls);
	};

	return (
		<div className="image-upload">
			<label className="btn">
				Select photos
				<input
					type="file"
					id="avatar"
					onChange={handleSelectedImages}
					accept=".jpg,.png,.jpeg"
					multiple
					hidden
				/>
			</label>

			<div>
				{imageUrls?.map((file, index) => (
					<Avatar
						key={index}
						src={file}
						shape="square"
						size="46"
						className="avatar"
						onClick={() => removePhoto(file)}
					/>
				))}
			</div>
		</div>
	);
}

export default ImageUpload;
