import AddProject from './AddProject';
import Project from './Project';
import noProjectImage from '../assets/no-projects.png';

function Main({ 
  newProjectFormDisplay, 
  handleProjectAdd, 
  handleNewProjectFormDisplay, 
  project, 
  handleProjectTaskAdd, 
  handleProjectDelete, 
  handleProjectTaskDelete 
}) {
  let mainContent = null;

  if (project && !newProjectFormDisplay) {
    mainContent = <Project
      project={project}
      handleProjectTaskAdd={handleProjectTaskAdd}
      handleProjectDelete={handleProjectDelete}
      handleProjectTaskDelete={handleProjectTaskDelete}
    />;
  } else if (newProjectFormDisplay) {
    mainContent = <AddProject
      handleProjectAdd={handleProjectAdd}
      handleNewProjectFormDisplay={handleNewProjectFormDisplay}
    />;
  } else {
    mainContent = <article 
      className="flex flex-col gap-4 items-center justify-center h-full"
    >
      <img src={noProjectImage} className='w-20 h-20 mb-4' alt="Notepad with a pen" />
      <h2 className="text-2xl font-bold">No Project Selected</h2>
      <p className="text-gray-500 mb-4">Select a project or get started with a new one</p>
      <button
        className="btn"
        onClick={() => handleNewProjectFormDisplay({ show: true })}
      >
        + Create New Project
      </button>
    </article>
  }

  return (
    <main className="w-full px-6 py-10">
      {mainContent}
    </main>
  );
}

export default Main;
