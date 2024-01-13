import "./info.scss";
function Info({ info, setInfo }) {
	if (!info) return;
	return (
		<div className="info-app">
			<h2>This is an example app for my protfolio, all contents are only for demo purpose. </h2>
			<button onClick={() => setInfo(false)}>❌</button>
		</div>
	);
}

export default Info;
