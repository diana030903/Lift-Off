import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
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
          <button className="btn btn-primary">Donate</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
