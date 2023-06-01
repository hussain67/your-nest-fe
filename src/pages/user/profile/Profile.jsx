import React, { useEffect, useState } from "react";
import ProfileImageUpload from "../../../components/forms/ProfileImageUpload";
import { useAuthContext } from "../../../context/authContext";
import "../../../components/forms/form.scss";
import { updateProfile } from "../../../utils/api/authApi";

const Profile = () => {
	const { auth } = useAuthContext();

	const [profile, setProfile] = useState({});
	const [uploading, setUploading] = useState(false);
	useEffect(() => {
		if (auth.user) {
			setProfile({
				username: auth.user.username,
				name: auth.user.name,
				email: auth?.user.email,
				company: auth.user.company,
				address: auth.user.address,
				phone: auth.user.phone,
				about: auth.user.about,
				photo: auth.user.photo
			});
		}
	}, []);
	const handleChange = e => {
		const { name, value } = e.target;
		setProfile({
			...profile,
			[name]: value
		});
	};
	const setPhoto = photo => {
		setProfile({
			...profile,
			photo
		});
	};
	const handleSubmit = e => {
		e.preventDefault();
		const resp = updateProfile(profile);

		console.log(profile);
		console.log(resp);
	};
	return (
		<section className="user-info">
			<h1 style={{ textAlign: "center" }}>Profile</h1>
			<form
				onSubmit={handleSubmit}
				className="form"
			>
				<div className="form-control">
					<input
						type="text"
						placeholder="Update your username"
						name="username"
						value={profile.username}
						onChange={handleChange}
					/>
				</div>
				<div className="form-control">
					<input
						type="text"
						placeholder="Update your username"
						name="name"
						value={profile.name}
						onChange={handleChange}
					/>
				</div>
				<div className="form-control">
					<input
						type="email"
						placeholder="Update your email"
						name="email"
						value={profile.email}
						onChange={handleChange}
					/>
				</div>

				<div className="form-control">
					<input
						type="text"
						placeholder="Update your company name"
						name="company"
						value={profile.company}
						onChange={handleChange}
					/>
				</div>
				<div className="form-control">
					<input
						type="text"
						placeholder="Update your address"
						name="address"
						value={profile.address}
						onChange={handleChange}
					/>
				</div>
				<div className="form-control">
					<input
						type="text"
						placeholder="Update your phone number"
						name="phone"
						value={profile.phone}
						onChange={handleChange}
					/>
				</div>
				<div className="form-control">
					<input
						type="text"
						placeholder="Write something interesting about yourself.."
						name="about"
						value={profile.about}
						onChange={handleChange}
					/>
				</div>
				<div className="form-control">
					<ProfileImageUpload
						photo={profile.photo}
						setPhoto={setPhoto}
						uploading={uploading}
						setUploading={setUploading}
					/>
				</div>

				<button
					className="btn btn-form-submit"
					type="submit"
					disabled={uploading}
					data-cy="profile-submit-btn"
				>
					{uploading ? "Processing" : "Update profile"}
				</button>
			</form>
		</section>
	);
};

export default Profile;
