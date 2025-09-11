import { useRef } from "react";

import ModalWrapper from "./ModalWrapper";

export default function DeleteProject({
  isOpen,
  onDelete,
  onCancel,
  projectId,
  projectTitle,
}) {
  const deleteModalRef = useRef();

  if (isOpen) {
    deleteModalRef.current.open();
  }

  function handleCancel() {
    onCancel();
    deleteModalRef.current.close();
  }

  function handleDelete() {
    onDelete(projectId);
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
