import Resizer from "react-image-file-resizer";
import { removeImage, uploadImage } from "../../utils/api/adApi";
import Avatar from "antd/es/avatar/avatar";
import "./imageUpload.scss";
const ImageUpload = ({ ad, setAd }) => {
	const handleUpload = async e => {
		try {
			let files = e.target.files;
			files = [...files];
			if (files?.length) {
				setAd({ ...ad, uploading: true });
				files.map(file => {
					new Promise((resolve, reject) => {
						Resizer.imageFileResizer(
							file,
							1080,
							720,
							"JPEG",
							100,
							0,
							async uri => {
								try {
									const resp = await uploadImage(uri);
									//console.log(resp);
									setAd(ad => ({
										...ad,
										photos: [resp, ...ad.photos],
										uploading: false
									}));
								} catch (error) {
									setAd({ ...ad, uploading: false });
								}
							},
							"base64"
						);
					});
				});
			}
		} catch (error) {
			setAd({ ...ad, uploading: false });
		}
	};

	const handleDelete = async photo => {
		try {
			setAd({ ...ad, uploading: true });
			window.confirm("Do you want to delete the image");
			const data = await removeImage(photo);
			if (data.ok) {
				const photos = ad.photos.filter(item => item.Key !== photo.Key);
				setAd({ ...ad, photos, uploading: false });
			}
			console.log(data);
		} catch (error) {
			setAd({ ...ad, uploading: false });
		}
	};

	return (
		<div className="image-upload">
			<label data-cy="image-upload">
				{ad.uploading ? "Processing..." : "Upload photos"}

				<input
					onChange={handleUpload}
					type="file"
					accept="image/*"
					multiple
					hidden
					data-cy="image-upload-input"
				/>
			</label>
			{ad.photos?.map(photo => {
				return (
					<Avatar
						src={`${photo.Location}`}
						gap={10}
						shape="square"
						onClick={() => handleDelete(photo)}
						key={photo.Key}
					/>
				);
			})}
		</div>
	);
};

export default ImageUpload;
