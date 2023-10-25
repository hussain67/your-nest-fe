import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import "./mainNav.scss";
import { BiChevronDown } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import Avatar from "antd/es/avatar/avatar";

const MainNav = () => {
	const { auth, setAuth } = useAuthContext();
	const navigate = useNavigate();
	const loggedIn = auth?.user !== null;

	const [showDropdown, setShowDropdown] = useState(false);
	const logout = () => {
		setAuth({
			user: null,
			token: "",
			refreshToken: ""
		});
		localStorage.removeItem("auth");
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
				<NavLink to="/">
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
			<div
				className="nav-user"
				onMouseEnter={() => setShowDropdown(true)}
				onMouseLeave={() => setShowDropdown(false)}
			>
				<div className="nav-user-info">
					<FaRegUserCircle />
					{loggedIn && (
						<span>
							{!auth?.user?.photo?.Location && auth?.user?.name}{" "}
							{auth?.user?.photo?.Location && (
								<Avatar
									src={`${auth?.user.photo?.Location}`}
									shape="round"
								/>
							)}
						</span>
					)}

					<BiChevronDown />
				</div>
				{showDropdown && (
					<ul className="nav-dropdown">
						<li
							onClick={() => {
								navigate("/dashboard");
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
						<li
							onClick={() => {
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
