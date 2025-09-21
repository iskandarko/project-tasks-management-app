import { useContext } from 'react';

import NewProject from './NewProject';
import Project from './Project';
import noProjectImage from '../assets/no-projects.png';
import { AppContext } from '../store/app-context';

function Main() {
  const { 
    appState: { 
      currentProjectId,
      isAddingProject,
    },
    projects,
    handleStartAddingProject,
  } = useContext(AppContext);
  let mainContent = null;

  const project = projects.length && projects.find(project => project.id === currentProjectId)

  if (project && !isAddingProject) {
    mainContent = (
      <Project project={project} />
    );
  } else if (isAddingProject) {
    mainContent = (
      <NewProject />
    );
  } else {
    mainContent = (
      <article 
        className="flex flex-col gap-4 items-center pt-10 md:pt-24"
      >
        <img src={noProjectImage} className='w-20 h-20 mb-4' alt="Notepad with a pen" />
        <h2 className="text-2xl font-bold">No Project Selected</h2>
        <p className="text-gray-500 mb-4">Select a project or get started with a new one</p>
        <button
          className="btn"
          onClick={handleStartAddingProject}
        >
          + Create New Project
        </button>
      </article>
    );
  }

  return (
    <main className="w-full px-6 py-10">
      {mainContent}
    </main>
  );
}

export default Main;
