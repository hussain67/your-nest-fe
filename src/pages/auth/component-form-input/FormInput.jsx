import React from "react";
import "./formInput.scss";

const FormInput = ({ label, error, ...otherProps }) => {
	const { name } = { ...otherProps };

	return (
		<div className="form-group">
			{label && (
				<label
					className="form-label"
					htmlFor={name}
				>
					{label}
				</label>
			)}

			<div className="form-control">
				<input
					id={name}
					className="form-input"
					{...otherProps}
				/>
				{error && <span className="error-message">{error} </span>}
			</div>
		</div>
	);
};

export default FormInput;
