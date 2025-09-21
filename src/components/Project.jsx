import { useContext } from 'react';
import { AppContext } from '../store/app-context';

import TaskList from './TaskList';

function Project({ project }) {
  const { 
    handleProjectDeleteStart,
    handleProjectTaskAdd,
    handleProjectTaskDelete
   } = useContext(AppContext);

  function handleAddTask(task) {
    handleProjectTaskAdd({ projectId: project.id, task });
  }

  function handleDeleteTask(index) {
    handleProjectTaskDelete({ projectId: project.id, index });
  }

  function handleDeleteProject() {
    handleProjectDeleteStart(project.id);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
          <p className="text-slate-500">Due: {project.dueDate}</p>
        </div>
        <button className="btn btn-secondary btn--danger" onClick={handleDeleteProject}>Delete</button>
      </div>
      <div className="project-details">
        <p className="project-description">
          {project.description}
        </p>
      </div>
      <hr />
      <TaskList projectTasks={project.tasks || []} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default Project;
