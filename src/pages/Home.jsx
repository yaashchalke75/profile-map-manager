import { useState } from 'react';
import ProfilesList from '../components/ProfilesList';
import '../styles/style.css';


function Home({ profiles }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter profiles based o
    const filteredProfiles = profiles.filter(
        (profile) =>
            profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            profile.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1>Profiles Directory</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: '8px',
                    marginBottom: '20px',
                    width: '100%',
                    maxWidth: '400px',
                    display: 'block',
                }}
            />

            <ProfilesList profiles={filteredProfiles} />
        </div>
    );
}

export default Home;
