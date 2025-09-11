import { useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export default function ModalWrapper ({
  ref,
  children,
  onClose,
}) {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current.showModal();
    },
    close() {
      dialogRef.current.close();
    }
  }));

  return createPortal(
    <dialog className='p-8 rounded-lg' ref={dialogRef} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal-root')
  );
}
