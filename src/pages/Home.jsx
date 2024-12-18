import React from "react";
import { projects } from "../data";
import ProjectCard from "../components/ProjectCard";

const Home = () => {
  return (
    <>
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
                <div className="stat-value">{projects.length}</div>
                <div className="stat-desc">All time</div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Donations</div>
                <div className="stat-value">$120K</div>
                <div className="stat-desc">Raised so far</div>
              </div>
              <div className="stat">
                <div className="stat-title">Goals Achieved</div>
                <div className="stat-value">35</div>
                <div className="stat-desc">70% success rate</div>
              </div>
        </div>
      </main>
      <h1 className="text-2xl font-bold text-white dark:text-black mb-5 ml-12">
        Projects ({projects.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 ml-12">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export default Home;