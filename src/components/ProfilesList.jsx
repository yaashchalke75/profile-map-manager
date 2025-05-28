import { useState } from 'react';
import ProfileCard from './ProfileCard';
import MapComponent from './MapComponent';

function ProfilesList({ profiles }) {
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    const handleSummaryClick = (profile) => {
        setSelectedProfile(profile);
    };

    // Filter based on name and location filter
    const filteredProfiles = profiles.filter(
        (profile) =>
            profile.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            profile.address.toLowerCase().includes(locationFilter.toLowerCase())
    );

    return (
        <div>
            <h2>Search Profiles</h2>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginRight: 8, padding: 6 }}
            />
            <input
                type="text"
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                style={{ padding: 6 }}
            />

            <div className="profile-list" style={{ marginTop: '20px' }}>
                {filteredProfiles.length > 0 ? (
                    filteredProfiles.map((profile) => (
                        <ProfileCard
                            key={profile.id}
                            profile={profile}
                            onSummaryClick={() => handleSummaryClick(profile)}
                        />
                    ))
                ) : (
                    <p>No profiles found.</p>
                )}
            </div>

            {selectedProfile && (
                <div className="map-container" style={{ marginTop: '30px' }}>
                    <h3>{selectedProfile.name}'s Location</h3>
                    <MapComponent address={selectedProfile.address} />
                    <button onClick={() => setSelectedProfile(null)} style={{ marginTop: '10px' }}>
                        Close Map
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfilesList;
