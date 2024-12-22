import React, { useEffect, useState } from "react";
import { projects } from "../data";
import ProjectCard from "../components/ProjectCard";
import Favorites from "../pages/Favorites";

const calculateStats = (projects) => {
  const totalDonations = projects.reduce((sum, project) => {
    const raisedAmount = parseFloat(project.raised.replace('$', '').replace(',', ''));
    return sum + raisedAmount;
  }, 0);

  const goalsAchieved = projects.filter(
    (project) => parseFloat(project.raised.replace('$', '').replace(',', '')) >= parseFloat(project.goal.replace('$', '').replace(',', ''))
  ).length;

  return {
    totalProjects: projects.length,
    totalDonations: totalDonations.toFixed(2),
    goalsAchieved,
  };
};

const Home = ({ searchQuery }) => {
  const [projectsData, setProjectsData] = useState(projects);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [totalStats, setTotalStats] = useState(calculateStats(projects));
  const [favorites, setFavorites] = useState([]);

  const { totalProjects, totalDonations, goalsAchieved } = totalStats;

  const handleDonate = (projectId) => {
    const updatedProjects = projectsData.map((project) => {
      if (project.id === projectId) {
        const updatedRaised = (parseFloat(project.raised.replace('$', '').replace(',', '')) + 1)
          .toFixed(2) 
          .replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
  
        const updatedProject = { 
          ...project, 
          raised: `$${updatedRaised}` 
        };
        return updatedProject;
      }
      return project;
    });
  
    setProjectsData(updatedProjects);
    setTotalStats(calculateStats(updatedProjects)); 
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  useEffect(() => {
  const savedFavorites = localStorage.getItem('favorites');
  if (savedFavorites) {
    setFavorites(JSON.parse(savedFavorites));
  }
}, []);

  useEffect(() => {
    const filtered = projectsData.filter((project) =>
      (project.name && project.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.category && project.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.author && project.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projectsData]);  

  return (
    <div className="min-h-screen dark:bg-[#f5f5f5]">
      <main className="p-6 flex flex-col items-center">
        <div className="slogan">
          <h1 className="text-2xl font-bold text-white dark:text-black mb-4">
            Empower Projects, Inspire Change. Your Goals,{" "}
            <span className="text-[#00df9a]">Our Platform</span>
          </h1>
        </div>
        <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-100 text-gray-700">
          <div className="stat">
            <div className="stat-title">Total Projects</div>
            <div className="stat-value">{totalProjects}</div>
            <div className="stat-desc">All time</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Donations</div>
            <div className="stat-value">${totalDonations}</div>
            <div className="stat-desc">Raised so far</div>
          </div>
          <div className="stat">
            <div className="stat-title">Goals Achieved</div>
            <div className="stat-value">{goalsAchieved}</div>
            <div className="stat-desc">Goals reached</div>
          </div>
        </div>
      </main>
      <h1 className="text-2xl font-bold text-white dark:text-black mb-5 ml-12">
        Projects
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 ml-12">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onDonate={handleDonate}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(project.id)}
            />
          ))
        ) : (
          <p className="text-white">No projects found matching your search.</p>
        )}
      </div>
      <Favorites favorites={favorites} projects={projects} toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default Home;
