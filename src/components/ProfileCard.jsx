import { useNavigate } from 'react-router-dom';

function ProfileCard({ profile, onSummaryClick }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/profile/${profile.id}`);
    };

    return (
        <div
            className="profile-card"
            onClick={handleClick}
            style={{
                border: '1px solid #ccc',
                padding: '12px',
                marginBottom: '10px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
            }}
            title="Click for details"
        >
            <img
                src={profile.photo}
                alt={profile.name}
                width={80}
                height={80}
                style={{ borderRadius: '50%', marginRight: '15px', objectFit: 'cover' }}
            />
            <div>
                <h3 style={{ margin: 0 }}>{profile.name}</h3>
                <p style={{ margin: '4px 0' }}>{profile.description}</p>
                <p style={{ margin: 0, fontStyle: 'italic', color: '#666' }}>{profile.address}</p>
            </div>
        </div>
    );
}

export default ProfileCard;
