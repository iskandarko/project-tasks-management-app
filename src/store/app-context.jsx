import { createContext, useState, useEffect } from "react";

export const AppContext = createContext({
  projects: [],
  appState: {
    currentProjectId: null,
    isAddingProject: false,
    isDeletingProject: false,
  },
  handleStartAddingProject: () => {},
  handleEndAddingProject: () => {},
  handleProjectSelect: () => {},
  handleProjectDeleteStart: () => {},
  handleProjectDeleteEnd: () => {},
  handleProjectTaskAdd: () => {},
  handleProjectTaskDelete: () => {},
});

export default function AppContextProvider({ children }) {
  const [projects, setProjects] = useState(() => fetchProjects());
  const [appState, setAppState] = useState({
    currentProjectId: null,
    isAddingProject: false,
    isDeletingProject: false,
  });

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
    setAppState((prevAppState) => ({ ...prevAppState, isAddingProject: true }));
  }

  function handleEndAddingProject(projectData) {
    if (projectData) {
      handleProjectAdd(projectData);
    }
    setAppState((prevAppState) => ({ ...prevAppState, isAddingProject: false }));
  }

  function handleProjectAdd({ title, description, dueDate }) {
    const projectId = Math.random();
    const newProject = { id: projectId, title, description, dueDate, tasks: [] };

    setProjects((prevProjects) => [...prevProjects, newProject]);
    handleProjectSelect(projectId);
  }

  function handleProjectDeleteStart() {
    setAppState((prevAppState) => ({ ...prevAppState, isDeletingProject: true }));
  }

  function handleProjectDeleteEnd(projectId) {
    if (projectId) {
      setProjects((prevProjects) => {
        return prevProjects.filter((project) => project.id !== projectId);
      });
    }
    setAppState((prevAppState) => ({ ...prevAppState, isDeletingProject: false }));
  }

  function handleProjectSelect(projectId) {
    setAppState((prevAppState) => ({ ...prevAppState, currentProjectId: projectId }));
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

  const ctxValue = {
    projects,
    appState,
    handleStartAddingProject,
    handleEndAddingProject,
    handleProjectSelect,
    handleProjectDeleteStart,
    handleProjectDeleteEnd,
    handleProjectTaskAdd,
    handleProjectTaskDelete,
  };

  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
};
