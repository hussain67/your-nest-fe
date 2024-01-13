import React, { useState } from "react";

import "../login-register/loginRegister.scss";

import "./profile.scss";
import ContactDetailsUpdate from "../../../components/forms/ContactDetailsUpdate";
import { Link } from "react-router-dom";
const Profile = () => {
	const [showElement, setShowElement] = useState(false);

	return (
		<section className="page-section">
			<article className="profile">
				{!showElement && (
					<div
						onClick={() => setShowElement(true)}
						className="btn-profile"
					>
						Edit Profile
					</div>
				)}

				{showElement && <ContactDetailsUpdate setShowElement={setShowElement} />}

				{!showElement && (
					<div className="btn-profile">
						<Link to="/account/forgot-password">Update Password</Link>
					</div>
				)}
			</article>
		</section>
	);
};

export default Profile;
