import { useRef } from "react";

function Tasks({ projectTasks, addTask, deleteTask }) {
  const taskInput = useRef(null);

  function handleAddTask(e) {
    e.preventDefault();
    const task = taskInput.current.value;
    if (task) {
      addTask(task);
      taskInput.current.value = null;
    }
  }

  function handleClearTask(index) {
    deleteTask(index);
  }

  return (
    <div className="tasks">
      <h3 className="text-2xl font-semibold mb-2">Tasks</h3>
      <div>
        <form className="flex gap-2" onSubmit={handleAddTask}>
          <input className='p-2 border border-stone-300 rounded flex-1' type="text" placeholder="Add task" ref={taskInput} />
          <button className="btn btn-secondary">+ Add Task</button>
        </form>
      </div>
      <ul className="mt-4 px-2">
        {projectTasks.length ? projectTasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="text-md">Task {index + 1}: {task}</span>
            <button className="btn btn-secondary" onClick={() => handleClearTask(index)}>Clear</button>
          </li>
        )) : <p>No tasks added yet.</p>}
      </ul>
    </div>
  );
}

export default Tasks;
