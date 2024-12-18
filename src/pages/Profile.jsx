import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    username: 'Username',
    email: 'user@example.com',
    avatar: '/assets/default-avatar.png'
  });

  const userProjects = []; // Здесь будут проекты пользователя из API/Redux

  return (
    <div className="p-6 bg-[#1e1e2e] text-white">
      <div className="tabs tabs-boxed mb-6">
        <button 
          className={`tab ${activeTab === 'profile' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('profile')}>
          Профиль
        </button>
        <button 
          className={`tab ${activeTab === 'projects' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('projects')}>
          Мои проекты
        </button>
        <button 
          className={`tab ${activeTab === 'history' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('history')}>
          История вывода
        </button>
        <button 
          className={`tab ${activeTab === 'settings' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('settings')}>
          Настройки
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="profile-info">
          <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full mb-4"/>
          <h2 className="text-xl mb-2">Имя пользователя: {user.username}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="projects-list">
          {userProjects.length > 0 ? (
            userProjects.map(project => (
              <div key={project.id} className="project-card">
                {/* Project card component */}
              </div>
            ))
          ) : (
            <p>У вас пока нет проектов</p>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="settings-form space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Изменить username</label>
            <input 
              type="text"
              className="w-full bg-[#14141c] text-gray-400 rounded-lg px-4 py-3"
              placeholder="Новый username"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Загрузить аватар</label>
            <input 
              type="file"
              className="w-full bg-[#14141c] text-gray-400 rounded-lg px-4 py-3"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Данные банковской карты</label>
            <input 
              type="text"
              className="w-full bg-[#14141c] text-gray-400 rounded-lg px-4 py-3"
              placeholder="Номер карты"
            />
          </div>
          <button className="btn btn-success">Сохранить изменения</button>
        </div>
      )}

      <button className="btn btn-error mt-6">Выйти</button>
    </div>
  );
};

export default Profile;