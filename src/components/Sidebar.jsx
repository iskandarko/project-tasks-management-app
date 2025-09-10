function Sidebar({ 
  handleNewProjectFormDisplay, 
  projects, 
  setCurrentProject,
  currentProject
}) {
  function handleProjectClick(projectId) {
    setCurrentProject(projects.find(project => project.id === projectId));
  }

  return (
    <nav className="bg-stone-800 text-white px-6 py-10 rounded-b-xl md:w-1/2 xl:w-1/3 2xl:w-1/4 md:h-full md:rounded-none md:rounded-tr-lg">
      <h1 className="text-2xl px-4 font-semibold mb-7 uppercase">Your Projects</h1>
      <button className="btn" onClick={() => handleNewProjectFormDisplay({ show: true })}>+ Add Project</button>
      {projects.length > 0 && (
        <ul className="mt-7">
        {projects.map((project) => (
          <li key={project.id} className="w-full mb-2">
            <button 
              className={`btn btn-secondary--dark w-full text-left ${
                  project.id === currentProject?.id ? 'btn--active' : ''
                }`}
              onClick={() => handleProjectClick(project.id)}
            >
              {project.title}
            </button>
          </li>
        ))}
      </ul>
      )}
    </nav>
  );
}

export default Sidebar;
