import Tasks from './Tasks';

function Project({ project, handleProjectTaskAdd, handleProjectDelete, handleProjectTaskDelete }) {

  function handleAddTask(task) {
    handleProjectTaskAdd({ projectId: project.id, task });
  }

  function handleDeleteTask(index) {
    handleProjectTaskDelete({ projectId: project.id, index });
  }

  function handleDelete() {
    handleProjectDelete(project.id);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
          <p className="text-slate-500">Due: {project.dueDate}</p>
        </div>
        <button className="btn btn-secondary" onClick={handleDelete}>Delete</button>
      </div>
      <div className="project-details">
        <p className="project-description">
          {project.description}
        </p>
      </div>
      <hr />
      <Tasks projectTasks={project.tasks || []} addTask={handleAddTask} deleteTask={handleDeleteTask} />
    </div>
  );
}

export default Project;
