import { useEffect, useState } from "react";

import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [projects, setProjects] = useState(() => fetchProjects());
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

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

  function handleStartAddingProject() {
    setIsAddingProject(true);
  }

  function handleEndAddingProject(projectData) {
    if (projectData) {
      handleProjectAdd(projectData);
    }
    setIsAddingProject(false);
  }

  function handleProjectAdd({ title, description, dueDate }) {
    const projectId = Math.random();
    const newProject = { id: projectId, title, description, dueDate, tasks: [] };

    setProjects((prevProjects) => [...prevProjects, newProject]);
    handleProjectSelect(projectId);
  }

  function handleProjectDelete(projectId) {
    setProjects((prevProjects) => {
      return prevProjects.filter((project) => project.id !== projectId);
    });
  }

  function handleProjectSelect(projectId) {
    setCurrentProjectId(projectId);
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
          projects={projects}
          currentProjectId={currentProjectId}
          onStartAddingProject={handleStartAddingProject}
          onProjectSelect={handleProjectSelect}
        />
        <MainContent
          project={projects.length && projects.find(project => project.id === currentProjectId)}
          isAddingProject={isAddingProject}
          onStartAddingProject={handleStartAddingProject}
          onEndAddingProject={handleEndAddingProject}
          onProjectDelete={handleProjectDelete}
          onProjectTaskAdd={handleProjectTaskAdd}
          onProjectTaskDelete={handleProjectTaskDelete}
        />
      </div>
    </div>
  );
}

export default App;
