import { useEffect, useState } from "react";

import Sidebar from './components/Sidebar';
import Main from './components/Main';

function App() {
  const [projects, setProjects] = useState(() => fetchProjects());
  const [newProjectFormDisplay, setNewProjectFormDisplay] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('projects', JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  }, [projects]);

  function fetchProjects() {
    try {
      const savedProjects = localStorage.getItem('projects');
      return savedProjects ? JSON.parse(savedProjects) : [];
    } catch (error) {
      console.error('Error parsing saved projects:', error);
      return [];
    }
  }

  function handleNewProjectFormDisplay({ show }) {
    setNewProjectFormDisplay(show);
  }

  function handleProjectAdd({ title, description, dueDate }) {
    const projectId = Math.random();
    const newProject = { id: projectId, title, description, dueDate, tasks: [] };

    setNewProjectFormDisplay(false);
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
  }

  function handleProjectDelete(projectId) {
    setProjects((prevProjects) => {
      return prevProjects.filter((project) => project.id !== projectId);
    });
    setCurrentProject(null);
  }

  function handleProjectTaskAdd({ projectId, task }) {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === projectId) {
          return { ...project, tasks: [...project.tasks, task] };
        }
        return project;
      });
    });
  }

  function handleProjectTaskDelete({ projectId, index }) {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === projectId) {
          return { ...project, tasks: project.tasks.filter((_, i) => i !== index) }
        } else {
          return project;
        }
      })
    })
  }

  return (
    <div className="app h-full md:container">
      <header>
        <h1 className='sr-only'>Project Management App</h1>
      </header>
      <div className="h-full md:flex md:gap-4 md:pt-9">
        <Sidebar
          handleNewProjectFormDisplay={handleNewProjectFormDisplay}
          projects={projects}
          setCurrentProject={setCurrentProject}
          currentProject={currentProject}
        />
        <Main
          handleProjectTaskDelete={handleProjectTaskDelete}
          handleProjectDelete={handleProjectDelete}
          newProjectFormDisplay={newProjectFormDisplay}
          handleNewProjectFormDisplay={handleNewProjectFormDisplay}
          handleProjectAdd={handleProjectAdd}
          handleProjectTaskAdd={handleProjectTaskAdd}
          project={projects.length && projects.find(project => project.id === currentProject?.id)}
        />
      </div>
    </div>
  );
}

export default App;
