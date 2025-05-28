import { useState, useEffect } from 'react';
import '../styles/style.css';

function AdminPanel({ profiles, addProfile, editProfile, deleteProfile }) {
    const [editingProfileId, setEditingProfileId] = useState(null);
    const [addingNew, setAddingNew] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        photo: '',
        description: '',
        address: '',
    });

    // When editingProfileId changes, update formData accordingly
    useEffect(() => {
        if (editingProfileId !== null) {
            const profile = profiles.find((p) => p.id === editingProfileId);
            if (profile) setFormData(profile);
        } else {
            setFormData({ id: '', name: '', photo: '', description: '', address: '' });
        }
    }, [editingProfileId, profiles]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const startAddNew = () => {
        setAddingNew(true);
        setEditingProfileId(null);
        setFormData({
            id: Date.now().toString(),
            name: '',
            photo: '',
            description: '',
            address: '',
        });
    };

    const cancel = () => {
        setAddingNew(false);
        setEditingProfileId(null);
        setFormData({ id: '', name: '', photo: '', description: '', address: '' });
    };

    const save = () => {
        if (addingNew) {
            addProfile(formData);
            setAddingNew(false);
        } else if (editingProfileId !== null) {
            editProfile(formData);
            setEditingProfileId(null);
        }
        setFormData({ id: '', name: '', photo: '', description: '', address: '' });
    };

    return (
        <div style={{ padding: 20 }}>
            <h2 className="admin-title">Admin Panel</h2>

            <div className="add-profile-button-wrapper">
                <button
                    onClick={startAddNew}
                    disabled={addingNew || editingProfileId !== null}
                >
                    Add New Profile
                </button>
            </div>


            {(addingNew || editingProfileId !== null) && (
                <div style={{ marginTop: 20, marginBottom: 20 }}>
                    <h2>{addingNew ? 'Add New Profile' : 'Edit Profile'}</h2>
                    <input
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ display: 'block', marginBottom: 10, width: '300px' }}
                    />
                    <input
                        name="photo"
                        placeholder="Photo URL"
                        value={formData.photo}
                        onChange={handleChange}
                        style={{ display: 'block', marginBottom: 10, width: '300px' }}
                    />
                    <input
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{ display: 'block', marginBottom: 10, width: '300px' }}
                    />
                    <input
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        style={{ display: 'block', marginBottom: 10, width: '300px' }}
                    />
                    <button
                        onClick={save}
                        disabled={!formData.name.trim() || !formData.photo.trim()}
                        style={{ marginRight: 10 }}
                    >
                        Save
                    </button>
                    <button onClick={cancel}>Cancel</button>
                </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 15 }}>
                {profiles.map((profile) => (
                    <div
                        key={profile.id}
                        style={{
                            border: '1px solid #ccc',
                            padding: 10,
                            width: 250,
                            borderRadius: 5,
                            position: 'relative',
                        }}
                    >
                        <img
                            src={profile.photo}
                            alt={profile.name}
                            width="100%"
                            height="150px"
                            style={{ objectFit: 'cover', borderRadius: 5 }}
                        />
                        <h3>{profile.name}</h3>
                        <p>{profile.description}</p>
                        <p>
                            <strong>Address:</strong> {profile.address}
                        </p>
                        <button
                            onClick={() => setEditingProfileId(profile.id)}
                            disabled={addingNew}
                            style={{ marginRight: 10 }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete this profile?')) {
                                    deleteProfile(profile.id);
                                }
                            }}
                            disabled={addingNew}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPanel;
