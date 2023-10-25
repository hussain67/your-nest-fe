import React from "react";
import "./siteFooter.scss";
const SiteFooter = () => {
	return (
		<div className="site-footer">
			<p> Your-nest &copy; {new Date().getFullYear()} All right reserved</p>
		</div>
	);
};

export default SiteFooter;
