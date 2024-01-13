import spinner from "../../assets/svg/spinner.svg";
import "./spinner.scss";
function Spinner({ size }) {
	return (
		<div className={`${size === "small" ? "" : "spinner-container"}`}>
			<div className={`${size === "small" ? "spinner-small" : "spinner"}`}>
				<img
					src={spinner}
					alt="Loading..."
				/>
			</div>
		</div>
	);
}

export default Spinner;
