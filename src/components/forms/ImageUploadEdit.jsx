import { Avatar } from "antd";
import { useState } from "react";

function ImageUploadEdit({ ad, setAd, images, setImages, imagesToDelete, setImagesToDelete, imagesFromAd, setImagesFromAd }) {
	const [avatarImages, setAvatarImages] = useState(imagesFromAd);

	const handleSelectedImages = e => {
		const selectedImages = e.target.files;

		//images is object, spreading within an array
		const newImageUrls = [...selectedImages].map(image => {
			return URL.createObjectURL(image);
		});

		setAvatarImages(avatarImages => {
			return [...avatarImages, ...newImageUrls];
		});

		// Will store newly selected images files that will be stored in google storage
		setImages(images => {
			return [...images, ...selectedImages];
		});
	};

	// Will remove image urls from
	const removePhoto = file => {
		const urls = avatarImages.filter(img => img !== file);
		setAvatarImages(urls);
		if (imagesFromAd.includes(file)) {
			setImagesToDelete(imagesToDelete => {
				return [...imagesToDelete, file];
			});
		}

		const photoesToRemainInAd = ad?.photos?.filter(img => img !== file);
		setAd({ ...ad, photos: photoesToRemainInAd });
	};

	return (
		<div className="image-upload">
			<div>
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
			</div>

			<div>
				{avatarImages?.map((file, index) => (
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
//

export default ImageUploadEdit;
