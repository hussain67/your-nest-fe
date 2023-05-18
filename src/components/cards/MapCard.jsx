import React from "react";
import GoogleMapReact from "google-map-react";

const MapCard = ({ ad }) => {
	const defaultProps = {
		center: {
			// lat: 52.486244,
			// lng: -1.890401
			lat: ad?.location.coordinates[1],
			lng: ad?.location.coordinates[0]
		},
		zoom: 11
	};

	return (
		<div style={{ width: "100%", height: "500px" }}>
			{ad?.location.coordinates.length && (
				<GoogleMapReact
					bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
					defaultCenter={defaultProps.center}
					defaultZoom={defaultProps.zoom}
				>
					<div
						// lat={52.486244}
						// lng={-1.890401}
						lat={ad?.location.coordinates[1]}
						lng={ad?.location.coordinates[0]}
					>
						<span style={{ fontSize: "35px" }}> 📍 </span>
					</div>
				</GoogleMapReact>
			)}
		</div>
	);
};

export default MapCard;
