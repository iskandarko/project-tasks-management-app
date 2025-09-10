import { useState } from "react";

function AddProject({ handleProjectAdd, handleNewProjectFormDisplay }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    handleProjectAdd({ title, description, dueDate });
  }

  function handleCancel() {
    setTitle('');
    setDescription('');
    setDueDate('');
    handleNewProjectFormDisplay({ show: false });
  }

  return (
    <div className="add-project">
      <form 
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title:</label>
          <input className='p-2 border border-stone-300 rounded' type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description:</label>
          <textarea className='p-2 border border-stone-300 rounded' id="description" name="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dueDate">Due Date:</label>
          <input className='p-2 border border-stone-300 rounded' type="date" id="dueDate" name="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="btn">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;
