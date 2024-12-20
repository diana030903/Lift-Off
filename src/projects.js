const getProjects = () => {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    return projects;
  };
  
  const saveProjects = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
  };
  
  const getProjectById = (id) => {
    const projects = getProjects();
    return projects.find(project => project.id === id);
  };
  
  const addProject = (project) => {
    const projects = getProjects();
    projects.push(project);
    saveProjects(projects);
  };
  
  const updateProject = (id, updatedProject) => {
    const projects = getProjects();
    const index = projects.findIndex(project => project.id === id);
    if (index !== -1) {
      projects[index] = updatedProject;
      saveProjects(projects);
    }
  };
  
  const deleteProject = (id) => {
    const projects = getProjects();
    const updatedProjects = projects.filter(project => project.id !== id);
    saveProjects(updatedProjects);
  };
  
  export { getProjects, saveProjects, getProjectById, addProject, updateProject, deleteProject };
  