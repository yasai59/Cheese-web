import React from "react";
import { useEffect } from "react";

export const Modal = ({ children, open = false, setOpen = () => {} , className = ""}) => {
  const modalRef = React.useRef(null);

  useEffect(() => {
    if (open) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [open]);

  return (
    <>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className={`modal-box bg-base-dark ${className ? className : ""}`}>
          {children}
          <div className="modal-action">
            <form method="dialog">
              <button
                className="px-5 py-3 bg-base rounded-lg"
                onClick={() => setOpen((prev) => !prev)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
