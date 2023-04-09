import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
	return (
		<div>
			<ul>
				<li>
					<NavLink to="/dashboard">Dashboard</NavLink>
				</li>
				<li>
					<NavLink to="/ad/create">Create add</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
