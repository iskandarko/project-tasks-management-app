import { useRef } from "react";

function AddProject({ onEndAddingProject }) {
  const titleInput = useRef(null);
  const descriptionInput = useRef(null);
  const dueDateInput = useRef(null);

  function handleSave(e) {
    e.preventDefault();
    onEndAddingProject({ 
      title: titleInput.current.value, 
      description: descriptionInput.current.value, 
      dueDate: dueDateInput.current.value 
    });
  }

  function handleCancel() {
    onEndAddingProject();
  }

  return (
    <div className="add-project">
      <form 
        className="flex flex-col gap-6"
        onSubmit={handleSave}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title:</label>
          <input className='p-2 border border-stone-300 rounded-md' type="text" id="title" name="title" ref={titleInput} required/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description:</label>
          <textarea className='p-2 border border-stone-300 rounded-md' id="description" name="description" rows="4" ref={descriptionInput}></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dueDate">Due Date:</label>
          <input className='p-2 border border-stone-300 rounded-md' type="date" id="dueDate" name="dueDate" ref={dueDateInput} required />
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
