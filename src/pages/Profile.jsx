import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    username: '',
    email: '',
    avatar: '/assets/avatar.jpg',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAvatar = URL.createObjectURL(file);

      const updatedUser = { ...user, avatar: newAvatar };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const userProjects = []; 

  return (
    <div className="min-h-screen p-6 bg-[#1e1e2e] text-white">
      <div className="tabs tabs-boxed mb-6">
        <button
          className={`tab ${activeTab === 'profile' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab ${activeTab === 'projects' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          My projects
        </button>
        <button
          className={`tab ${activeTab === 'history' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Withdrawals
        </button>
        <button
          className={`tab ${activeTab === 'settings' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="profile-info">
          <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full mb-4" />
          <h2 className="text-xl mb-2">Username: {user.username}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="projects-list">
          {userProjects.length > 0 ? (
            userProjects.map((project) => (
              <div key={project.id} className="project-card">
              </div>
            ))
          ) : (
            <p>You don't have any projects yet.</p>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="settings-form space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Change username</label>
            <input
              type="text"
              className="w-full bg-[#14141c] text-gray-400 rounded-lg px-4 py-3"
              placeholder="New username"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Upload avatar</label>
            <input
              type="file"
              onChange={handleAvatarUpload}
              className="w-full bg-[#14141c] text-gray-400 rounded-lg px-4 py-3"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Bank card details</label>
            <input
              type="text"
              className="w-full bg-[#14141c] text-gray-400 rounded-lg px-4 py-3"
              placeholder="Номер карты"
            />
          </div>
          <button className="btn btn-success bg-[#00df9a]">Save changes</button>
          <button onClick={handleLogout} className="btn btn-error mt-6">
            Exit
          </button>
        </div>
      )}

      {activeTab !== 'settings' && (
        <div className="hidden">
        </div>
      )}
    </div>
  );
};

export default Profile;
