import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import "./nav.scss";

const MainNav = () => {
	const { auth, setAuth } = useAuthContext();
	const navigate = useNavigate();

	const loggedIn = auth?.user !== null;

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
		<section className="nav-section">
			<nav className="nav">
				<NavLink
					to="/"
					data-cy="mainnav-home-link"
				>
					Home
				</NavLink>
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
			</nav>
		</section>
	);
};

export default MainNav;
