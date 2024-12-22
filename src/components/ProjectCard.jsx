import React, { useState } from "react";

const ProjectCard = ({ project, onDonate, toggleFavorite, isFavorite }) => {
  const [donated, setDonated] = useState(false);

  const handleDonate = () => {
    setDonated(true);
    onDonate(project.id);
  };

  return (
    <div className="card bg-base-100 w-96 shadow-2xl">
      <figure className="relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{project.name}</h2>
        <p className="text-sm text-gray-500">{project.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-lg font-semibold">
            Raised: <span className="text-green-600">{project.raised}</span> /{" "}
            <span className="text-red-600">{project.goal}</span>
          </div>
          <div className="text-sm text-gray-600">{project.daysLeft} Days Left</div>
        </div>
        <div className="card-actions justify-between mt-4">
          <span className="text-sm text-gray-400">Category: {project.category}</span>
          <span className="text-sm text-gray-400">Author: {project.author}</span>
        </div>
        <div className="card-actions justify-end mt-4">
          <button 
            className={`btn ${donated ? 'btn-secondary' : 'btn-primary'}`}
            onClick={handleDonate}
            disabled={donated}
          >
            {donated ? "Thanks for your donation!" : "Donate $1"}
          </button>
          <button
          className={`absolute top-2 right-2 p-2 rounded-full ${isFavorite ? "bg-red-500" : "bg-green-500"}`}
          onClick={() => toggleFavorite(project.id)}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
