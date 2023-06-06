import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import "./mainNav.scss";
import { BiChevronDown } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";

const MainNav = () => {
	const { auth, setAuth } = useAuthContext();
	const navigate = useNavigate();
	const loggedIn = auth?.user !== null;
	const [showDropdown, setShowDropdown] = useState(false);

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
		//navigate("/account/login-register");
	};
	return (
		<nav className="nav">
			<NavLink
				to="/"
				data-cy="mainnav-home-link"
			>
				Home
			</NavLink>

			{auth?.user ? (
				<NavLink to="/account/login-register">
					<span onClick={logout}> Log out</span>
				</NavLink>
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
					<FaRegUserCircle /> {loggedIn ? <span> {auth?.user?.name}</span> : ""} <BiChevronDown />
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
						<li
							onClick={() => {
								toggleShowDropdown();
								navigate("/ad/create");
							}}
						>
							Create Ad
						</li>
						<li
							onClick={() => {
								toggleShowDropdown();
								navigate("/user/profile");
							}}
						>
							Profile
						</li>
						<li
							onClick={() => {
								toggleShowDropdown();
								navigate("/user/setting");
							}}
						>
							Settings
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
};

export default MainNav;
