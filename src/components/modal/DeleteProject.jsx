import { useRef, useContext } from "react";

import ModalWrapper from "./ModalWrapper";
import { AppContext } from "../../store/app-context";

export default function DeleteProject() {
  const { 
    appState: { 
      isDeletingProject,
      currentProjectId,
    },
    projects,
    handleProjectDeleteEnd,
  } = useContext(AppContext);

  const deleteModalRef = useRef();
  const projectTitle = projects.find(project => project.id === currentProjectId)?.title

  if (isDeletingProject) {
    deleteModalRef.current.open();
  }

  function handleCancel() {
    handleProjectDeleteEnd();
    deleteModalRef.current.close();
  }

  function handleDelete() {
    handleProjectDeleteEnd(currentProjectId);
    deleteModalRef.current.close();
  }

  return (
    <ModalWrapper ref={deleteModalRef} onClose={handleCancel}>
        <p className="mb-8">Are you sure you want to delete project <strong>"{projectTitle}"</strong>?</p>
        <div className="flex justify-end gap-2">
          <button className="btn btn-secondary btn--danger" onClick={handleDelete}>OK</button>
          <button className="btn" onClick={handleCancel}>Cancel</button>
        </div>
    </ModalWrapper>
  );
}
