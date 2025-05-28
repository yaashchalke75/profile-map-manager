import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ProfileDetail from './pages/ProfileDetail';
import AdminPanel from './pages/AdminPanel';

import initialProfiles from './data/profiles.json';

import './styles/style.css';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load profiles from localStorage or initial JSON on mount
  useEffect(() => {
    const saved = localStorage.getItem('profiles');
    if (saved) {
      setProfiles(JSON.parse(saved));
    } else {
      setProfiles(initialProfiles);
    }
    // Simulate loading delay
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Sync to localStorage when profiles change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('profiles', JSON.stringify(profiles));
    }
  }, [profiles, loading]);

  // Add new profile
  const addProfile = (newProfile) => {
    setProfiles((prev) => [...prev, newProfile]);
  };

  // Edit existing profile
  const editProfile = (updatedProfile) => {
    setProfiles((prev) =>
      prev.map((profile) => (profile.id === updatedProfile.id ? updatedProfile : profile))
    );
  };

  // Delete profile by id
  const deleteProfile = (id) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading profiles...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home profiles={profiles} />} />
        <Route path="/profile/:id" element={<ProfileDetail profiles={profiles} />} />
        <Route
          path="/admin"
          element={
            <AdminPanel
              profiles={profiles}
              addProfile={addProfile}
              editProfile={editProfile}
              deleteProfile={deleteProfile}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
