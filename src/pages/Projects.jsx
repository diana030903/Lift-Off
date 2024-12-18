import React from 'react';
import { projects } from '../data';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white dark:text-black mb-5">
        All Projects ({projects.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;