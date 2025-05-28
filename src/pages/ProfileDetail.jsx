import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import '../styles/style.css';

function ProfileDetail({ profiles }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [mapLoading, setMapLoading] = useState(true);

    useEffect(() => {
        const found = profiles.find((p) => p.id.toString() === id);
        setProfile(found || null);
    }, [id, profiles]);

    if (!profile) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>Profile not found</h2>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    // Map load complete
    const handleMapLoaded = () => {
        setMapLoading(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
                ← Back
            </button>

            <h1>{profile.name}</h1>

            <img
                src={profile.photo}
                alt={profile.name}
                width={150}
                height={150}
                style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
            />

            <p>
                <strong>Description:</strong> {profile.description}
            </p>

            <p>
                <strong>Address:</strong> {profile.address}
            </p>

            {profile.contact && (
                <p>
                    <strong>Contact:</strong> {profile.contact}
                </p>
            )}

            {profile.interests && (
                <p>
                    <strong>Interests:</strong> {profile.interests}
                </p>
            )}

            <div style={{ marginTop: '30px' }}>
                <h3>Location Map</h3>
                {mapLoading && <p>Loading map...</p>}
                <MapComponent address={profile.address} onMapLoad={handleMapLoaded} />
            </div>
        </div>
    );
}

export default ProfileDetail;
