import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import "./mainNav.scss";
import { BiUser, BiChevronDown } from "react-icons/bi";

const MainNav = () => {
	const { auth, setAuth } = useAuthContext();
	const navigate = useNavigate();
	const loggedIn = auth?.user !== null;
	const [showDropdown, setShowDropdown] = useState(false);
	console.log(showDropdown);
	const handlePostAdClick = () => {
		if (loggedIn) {
			navigate("/ad/create");
		} else {
			navigate("/account/login-register");
		}
	};

	const toggleShowDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const logout = () => {
		setAuth({
			user: null,
			token: "",
			refreshToken: ""
		});
		localStorage.removeItem("auth");
		navigate("/account/login-register");
	};
	return (
		<nav className="nav">
			<NavLink
				to="/"
				data-cy="mainnav-home-link"
			>
				Home
			</NavLink>
			<div onClick={handlePostAdClick}>Post Ad</div>
			{loggedIn ? (
				<Link>
					<span onClick={logout}> Log out</span>
				</Link>
			) : (
				<NavLink
					to="/account/login-register"
					data-cy="mainnav-login-link"
				>
					Login/Register
				</NavLink>
			)}
			<div className="nav-user">
				<div onClick={toggleShowDropdown}>
					{loggedIn ? <span> {auth?.user.name}</span> : <BiUser />} <BiChevronDown />
				</div>
				{showDropdown && (
					<ul className="nav-dropdown">
						<li
							onClick={() => {
								toggleShowDropdown();
								navigate("/dashboard");
							}}
						>
							Dashboard
						</li>
						<li>Create Ad</li>
						<li>Profile</li>
						<li>Settings</li>
					</ul>
				)}
			</div>
		</nav>
	);
};

export default MainNav;
