import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.scss";

const MainNav = () => {
	return (
		<nav className="nav">
			<NavLink
				to="/"
				data-cy="mainnav-home-link"
			>
				Home
			</NavLink>
			<NavLink
				to="/login"
				data-cy="mainnav-login-link"
			>
				Login
			</NavLink>
			<NavLink
				to="/register"
				data-cy="mainnav-register-link"
			>
				Register
			</NavLink>
		</nav>
	);
};

export default MainNav;
