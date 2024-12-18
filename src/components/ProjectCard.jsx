import React from "react";

const ProjectCard = ({ project }) => {
  return (
    // <div className="bg-[#1e1e2e] rounded-lg shadow-lg p-4 text-white max-w-sm">
    //   <img
    //     src={project.image}
    //     alt={project.title}
    //     className="rounded-md w-full h-36 object-cover mb-4"
    //   />
    //   <p className="text-sm opacity-70 mb-1">{project.category}</p>
    //   <h3 className="text-lg font-bold mb-1">{project.title}</h3>
    //   <p className="text-sm opacity-80 mb-2 truncate">{project.description}</p>
    //   <div className="flex justify-between items-center text-sm">
    //     <p>
    //       <span className="font-bold">{project.raised}</span> Raised of{" "}
    //       {project.goal}
    //     </p>
    //     <p className="text-red-400">{project.daysLeft} Days Left</p>
    //   </div>
    //   <p className="text-xs mt-2 opacity-70">
    //     by {project.creator}
    //   </p>
    // </div>

    <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Donate</button>
            </div>
        </div>
    </div>
  );
};

export default ProjectCard;
