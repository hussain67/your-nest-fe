import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import "./mainNav.scss";
import { BiChevronDown } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { signOutUser } from "../../utils/firebase/firebaseAuth";

const MainNav = () => {
	const { auth } = useAuthContext();
	const navigate = useNavigate();
	const loggedIn = auth?.user !== null;

	const [showDropdown, setShowDropdown] = useState(false);
	const logout = () => {
		signOutUser();
	};
	return (
		<nav className="nav">
			<NavLink
				to="/"
				data-cy="mainnav-home-link"
			>
				Home
			</NavLink>

			{auth ? (
				<NavLink to="/">
					<span onClick={logout}> Log out</span>
				</NavLink>
			) : (
				<NavLink
					to="/account/login"
					data-cy="mainnav-login-link"
				>
					Login/Register
				</NavLink>
			)}
			<div
				className="nav-user"
				onMouseEnter={() => setShowDropdown(true)}
				onMouseLeave={() => setShowDropdown(false)}
			>
				<div className="nav-user-info">
					<FaRegUserCircle />
					{loggedIn && <span>{auth?.displayName}</span>}

					<BiChevronDown />
				</div>
				{showDropdown && (
					<ul className="nav-dropdown">
						<li
							onClick={() => {
								navigate("user/dashboard");
							}}
						>
							Dashboard
						</li>
						<li
							onClick={() => {
								navigate("/ad/create");
							}}
						>
							Create Ad
						</li>
						<li
							onClick={() => {
								navigate("/user/profile");
							}}
						>
							Profile
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
};

export default MainNav;
