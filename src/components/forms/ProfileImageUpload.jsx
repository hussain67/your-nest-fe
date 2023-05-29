import Resizer from "react-image-file-resizer";
import { removeImage, uploadImage } from "../../utils/api/adApi";
import Avatar from "antd/es/avatar/avatar";
import "./imageUpload.scss";
import { useAuthContext } from "../../context/authContext";

const ProfileImageUpload = ({ photo, setPhoto, uploading, setUploading }) => {
	const { auth, setAuth } = useAuthContext();
	const handleUpload = async e => {
		try {
			let file = e.target.files[0];
			if (file) {
				console.log(file);
				setUploading(true);

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
								console.log(resp);
								setPhoto(resp);
								setUploading(false);
							} catch (error) {
								setUploading(false);
							}
						},
						"base64"
					);
				});
			}
		} catch (error) {
			setUploading(false);
		}
	};

	const handleDelete = async file => {
		try {
			setUploading(true);
			window.confirm("Do you want to delete the image");
			const data = await removeImage(photo);
			if (data.ok) {
				setPhoto(null);
				setUploading(false);
			}
			console.log(data);
		} catch (error) {
			setUploading(false);
		}
	};

	return (
		<div className="image-upload">
			<label data-cy="image-upload">
				{uploading ? "Processing..." : "Upload photo"}

				<input
					onChange={handleUpload}
					type="file"
					accept="image/*"
					hidden
					data-cy="image-upload-input"
				/>
			</label>
			{photo?.Location ? (
				<Avatar
					src={`${photo.Location}`}
					gap={10}
					shape="square"
					onClick={() => handleDelete(photo)}
					key={photo.Key}
				/>
			) : (
				""
			)}
		</div>
	);
};

export default ProfileImageUpload;
