import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.scss";

const MainNav = () => {
	return (
		<section className="nav-section">
			<nav className="nav">
				<NavLink
					to="/"
					data-cy="mainnav-home-link"
				>
					Home
				</NavLink>
				<NavLink
					to="/account/login-register"
					data-cy="mainnav-login-link"
				>
					Login/register
				</NavLink>
			</nav>
		</section>
	);
};

export default MainNav;
