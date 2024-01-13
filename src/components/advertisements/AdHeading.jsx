function AdHeading({ type, action, noAds }) {
	if (type === "all") {
		return <h2>You have {noAds} advertisements</h2>;
	}
	return (
		<h2>
			{type} to {action}
		</h2>
	);
}

export default AdHeading;
