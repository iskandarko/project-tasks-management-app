import TaskList from './TaskList';

function Project({ project, onProjectTaskAdd, onProjectDelete, onProjectTaskDelete }) {

  function handleAddTask(task) {
    onProjectTaskAdd({ projectId: project.id, task });
  }

  function handleDeleteTask(index) {
    onProjectTaskDelete({ projectId: project.id, index });
  }

  function handleDelete() {
    onProjectDelete(project.id);
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
      <TaskList projectTasks={project.tasks || []} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default Project;
