import React from "react";
import "./siteFooter.scss";
const SiteFooter = () => {
	return (
		<div className="site-footer">
			<h4>Your-nest - Buy Sell or Rent Properties</h4>
			<p>&copy; {new Date().getFullYear()} All wright reserved</p>
		</div>
	);
};

export default SiteFooter;
