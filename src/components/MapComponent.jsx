import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Spinner() {
    return <div style={{ textAlign: 'center', padding: '10px' }}>Loading map...</div>;
}

function MapComponent({ address, onMapLoad }) {
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const geocode = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
                );
                const data = await response.json();
                if (data && data.length > 0) {
                    const { lat, lon } = data[0];
                    setPosition([parseFloat(lat), parseFloat(lon)]);
                } else {
                    setPosition([51.505, -0.09]); // fallback
                }
            } catch (error) {
                console.error("Geocoding error:", error);
                setPosition([51.505, -0.09]); // fallback
            } finally {
                setLoading(false);
                if (onMapLoad) onMapLoad();
            }
        };

        geocode();
    }, [address, onMapLoad]);

    if (loading || !position) return <Spinner />;

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: '300px', width: '100%', borderRadius: '8px' }}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>{address}</Popup>
            </Marker>
        </MapContainer>
    );
}

export default MapComponent;
