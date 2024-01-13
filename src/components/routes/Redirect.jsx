import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./redirect.scss";

const Redirect = () => {
	const [count, setCount] = useState(3);
	const navigate = useNavigate();

	useEffect(() => {
		const interval = setInterval(() => {
			setCount(currentCount => --currentCount);
		}, 1000);
		count === 0 && navigate("/account/login");
		return () => clearInterval(interval);
	}, [count, navigate]);

	return (
		<div className="redirect">
			<h3>
				Please login, you will be redirected in <span className="redirect-count">{count}</span> seconds{" "}
			</h3>
		</div>
	);
};

export default Redirect;
