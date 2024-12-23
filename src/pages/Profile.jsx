import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, addProject, updateProject, deleteProject } from '../projects';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    username: '',
    email: '',
    avatar: '/assets/avatar.jpg',
    bankDetails: {
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    }
  });

  const [newUsername, setNewUsername] = useState(user.username);
  const [errors, setErrors] = useState({
    email: '',
    bankNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const handleBankDetailsChange = (e) => {
    setUser(prev => {
      const updatedUser = {
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [e.target.name]: e.target.value
        }
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });

    if (e.type === "blur") {
      e.target.value = '';
    }

  };  
  
  const [userProjects, setUserProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    duration: '',
    image: null,
  });
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser((storedUser))
      setNewUsername(storedUser.username);
    } else {
      navigate('/signin');
    }
  }, [navigate]);
  
  useEffect(() => {
    if (user.username) {
      const storedProjects = getProjects(user.username);
      setUserProjects(storedProjects);
    }
  }, [user.username]);

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

  const handleCreateProject = () => {
    let newProject = {
      id: editingProject ? editingProject.id : Date.now(),
      title: formData.title,
      description: formData.description,
      goal: formData.goal,
      duration: formData.duration,
      image: formData.image ? URL.createObjectURL(formData.image) : formData.image,
    };

  if (editingProject) {
    updateProject(user.username, editingProject.id, formData);
  } else {
    addProject(user.username, newProject);
  }

  setUserProjects((prevProjects) => {
    if (editingProject) {
      return prevProjects.map((project) =>
        project.id === editingProject.id ? newProject : project
      );
    } else {
      return [...prevProjects, newProject];
    }
  });

    setFormData({
      title: '',
      description: '',
      goal: '',
      duration: '',
      image: null,
    });
  };

  const handleEditProject = (project) => {
    setEditingProject(project); 
    setFormData({
      title: project.title,
      description: project.description,
      goal: project.goal,
      duration: project.duration,
      image: project.image,
    });
  };

  const handleDeleteProject = (projectId) => {
    deleteProject(user.username, projectId);
    setUserProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    )
  };

  const handleSaveChanges = () => {
    const updatedUser = { ...user, username: newUsername };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setUser(prev => ({ ...prev, email: value }));
    const emailError = validateEmail(value);
    setErrors(prev => ({ ...prev, email: emailError }));
  };
  
  const handleBankNumberChange = (e) => {
    const value = e.target.value;
    setUser(prev => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        cardNumber: value
      }
    }));
    const bankNumberError = validateBankNumber(value);
    setErrors(prev => ({ ...prev, bankNumber: bankNumberError }));
  };
  
  const handleExpiryDateChange = (e) => {
    const value = e.target.value;
    setUser(prev => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        expiryDate: value
      }
    }));
    const expiryDateError = validateExpiryDate(value);
    setErrors(prev => ({ ...prev, expiryDate: expiryDateError }));
  };
  
  const handleCvvChange = (e) => {
    const value = e.target.value;
    setUser(prev => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        cvc: value
      }
    }));
    const cvvError = validateCVV(value);
    setErrors(prev => ({ ...prev, cvv: cvvError }));
  };

  return (
    <div className="min-h-screen p-6 dark:bg-[#f5f5f5] text-white bg-[#181821] dark:bg-[#f5f5f5] text-white dark:text-black relative">
      <div className="tabs tabs-boxed mb-10 shadow-custom-dark dark:shadow-custom-light">
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
          <img src={user.avatar || '/assets/avatar.jpg'} alt="Avatar" className="w-24 h-24 rounded-full mb-4" />
          <h2 className="text-xl mb-2">{user.username}</h2>
            <p>{user.email}</p>
            {user.bankDetails && (
            <div className="mt-4">
            <h3 className="text-lg mb-2">Bank Details:</h3>
            <p>Card Number: {user.bankDetails.cardNumber}</p>
            <p>Expiry Date: {user.bankDetails.expiryDate}</p>
        </div>
      )}
    </div>
  )}

      {activeTab === 'projects' && (
        <div className="projects-list">
          <h3 className="text-xl mb-4">Your Projects</h3>
          {userProjects.length > 0 ? (
            userProjects.map((project) => (
              <div key={project.id} className="project-card mb-4 p-4 bg-[#23252f] rounded-md">
                <h4 className="text-lg">{project.title}</h4>
                <p>{project.description}</p>
                <button
                  onClick={() => handleEditProject(project)} className="btn btn-info mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)} className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>You don't have any projects yet.</p>
          )}

          <div className="project-form mt-6">
            <h3 className="text-xl mb-4">{editingProject ? 'Edit Project' : 'Create New Project'}</h3>
            <div className="mb-4">
              <label className="block text-white">Project Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#14141c] text-white rounded-lg px-4 py-3"
                placeholder="Project Title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#14141c] text-white rounded-lg px-4 py-3"
                placeholder="Project Description"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Goal Amount</label>
              <input
                type="number"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full bg-[#14141c] text-white rounded-lg px-4 py-3"
                placeholder="Goal Amount"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Duration (in days)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full bg-[#14141c] text-white rounded-lg px-4 py-3"
                placeholder="Duration in days"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Project Image</label>
              <input
                type="file"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                className="w-full bg-[#14141c] text-white rounded-lg px-4 py-3"
              />
            </div>
            <button onClick={handleCreateProject} className="btn btn-primary mt-4">
              {editingProject ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="settings-form space-y-6">
          <div>
            <label className="block text-gray-400 mb-2 text-white dark:text-black relative">Change username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full bg-[#14141c] text-gray-400 rounded-lg px-4 py-3 bg-[#181822] dark:bg-[#f5f5f5] text-white dark:text-black relative shadow dark:shadow-lg transition-shadow"
              placeholder="New username"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-white dark:text-black relative">Change email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => {
                  const updatedUser = { ...prev, email: e.target.value };
                  localStorage.setItem('user', JSON.stringify(updatedUser));
                  return updatedUser;
                })
              }
              className="w-full bg-[#14141c] text-gray-400 rounded-lg px-4 py-3 bg-[#181822] dark:bg-[#f5f5f5] text-white dark:text-black relative shadow dark:shadow-lg transition-shadow"
              placeholder="New email"
            />
            
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-white dark:text-black relative">Upload avatar</label>
            <input 
            type="file" 
            onChange={handleAvatarUpload} 
            className="w-full bg-[#14141c] text-gray-400 rounded-lg px-4 py-3 bg-[#181822] dark:bg-[#f5f5f5] text-white dark:text-black relative shadow dark:shadow-lg transition-shadow" />
          </div>
        <div>
          <label className="block text-gray-400 mb-2 text-white dark:text-black relative">Bank card details</label>
          <input 
            type="text" 
            name="cardNumber" 
            value={user.bankDetails?.cardNumber || ''} 
            onChange={handleBankDetailsChange} 
            className="w-1/3 bg-[#14141c] text-gray-400 rounded-lg px-4 py-3 bg-[#181822] dark:bg-[#f5f5f5] text-white dark:text-black relative shadow dark:shadow-lg transition-shadow" 
            placeholder="Card Number" 
          />

          <input 
            type="text" 
            name="expiryDate" 
            value={user.bankDetails?.expiryDate || ''} 
            onChange={handleBankDetailsChange} 
            className="w-1/4 bg-[#14141c] text-gray-400 rounded-lg px-4 py-3 ml-5 bg-[#181822] dark:bg-[#f5f5f5] text-white dark:text-black relative shadow dark:shadow-lg transition-shadow" 
            placeholder="MM/YY" 
          />
          {errors.expiryDate && <span className="text-red-500 text-sm">{errors.expiryDate}</span>}

          <input 
            type="text" 
            name="cvc" 
            value={user.bankDetails?.cvc || ''} 
            onChange={handleBankDetailsChange} 
            className="w-1/4 bg-[#14141c] text-gray-400 rounded-lg px-4 py-3 ml-5 bg-[#181822] dark:bg-[#f5f5f5] text-white dark:text-black relative shadow dark:shadow-lg transition-shadow" 
            placeholder="CVC" 
            />
          {errors.cvv && <span className="text-red-500 text-sm">{errors.cvv}</span>}  

          </div>
          <button onClick={handleSaveChanges} className="btn btn-success mt-6 rounded-full bg-[#00df9a] text-white dark:text-white relative">Save changes</button>
          <button onClick={handleLogout} className="btn btn-error mt-6 w-20 rounded-full ml-10 text-white dark:text-white relative">
            Exit
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;