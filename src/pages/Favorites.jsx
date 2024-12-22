import React from "react";
import Sidebar from "../components/Sidebar";

const Favorites = ({ favorites, projects, toggleFavorite }) => {
  if (!projects || !favorites) {
    return <p className="text-white">Loading...</p>;
  } 
  const favoriteProjects = projects.filter(project => favorites.includes(project.id));
  
  if (favoriteProjects.length === 0) {
    return <p className="text-white">No favorite projects found.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#181825] p-6">
      <h1 className="text-2xl font-bold text-white mb-5">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 flex-grow">
        {favoriteProjects.length > 0 ? (
          favoriteProjects.map((project) => (
            <div key={project.id} className="card bg-base-100 w-96 shadow-2xl">
              <figure className="relative">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{project.name}</h2>
                <p className="text-sm text-gray-500">{project.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No favorite projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
