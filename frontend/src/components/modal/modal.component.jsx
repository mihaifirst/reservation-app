import style from "./modal.module.css";
import React from "react";

const Modal = ({children, isOpen, onClose, onSubmit, titleLabel, submitButtonLabel}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={style.modalBackdrop}>
            <div className={style.modalContent}>
                <div className={style.modalHeader}>
                    <h2>{titleLabel}</h2>
                    <button className={style.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>
                {children}
                <div className={style.modalFooter}>
                    <button className={style.cancelButton} onClick={onClose}>
                        Inchide
                    </button>
                    {submitButtonLabel && <button className={style.createButton} onClick={onSubmit}>
                        {submitButtonLabel}
                    </button>}
                </div>
            </div>
        </div>
    );
};

export default Modal;