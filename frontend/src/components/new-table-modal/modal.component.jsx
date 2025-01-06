import React from "react";
import style from "./modal.module.css";

const Modal = ({ isOpen, isClosed, onSubmit, children, submitButtonLabel }) => {
  if (!isOpen) return null;

  return (
    <div className={style.modalBackdrop}>
      <div className={style.modalContent}>
        <button className={style.closeButton} onClick={isClosed}>
          &times;
        </button>
        {children}
        <div className={style.modalFooter}>
          <button className={style.cancelButton} onClick={isClosed}>
            Cancel
          </button>
          <button className={style.createButton} onClick={onSubmit}>
            {submitButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
