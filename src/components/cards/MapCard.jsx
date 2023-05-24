import { MapContainer, TileLayer, Marker } from "react-leaflet";
const MapCard = ({ ad }) => {
	const la = ad?.location.coordinates[1];
	const ln = ad?.location.coordinates[0];

	const position = [la, ln];

	if (la && ln) {
		return (
			<MapContainer
				center={position}
				zoom={13}
				scrollWheelZoom={false}
				style={{ height: "300px", width: "100%" }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}></Marker>
			</MapContainer>
		);
	}
};

export default MapCard;
