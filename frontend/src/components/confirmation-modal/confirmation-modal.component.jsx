import Modal from "../modal/modal.component";
import React, {useEffect, useState} from "react";

const ConfirmationModal = ({
                               isOpen,
                               onClose,
                               onSubmit,
                               submitButtonLabel,
                               modalTitleLabel,
                               modalMessage
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsModalOpen(true);
        }
    }, [isOpen]);

    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
    };

    const onCloseHandler = () => {
        closeModal();
    };

    const onSubmitHandler = () => {
        onSubmit();
        closeModal();
    };

    return <Modal
        isOpen={isModalOpen}
        onClose={onCloseHandler}
        onSubmit={onSubmitHandler}
        titleLabel={modalTitleLabel}
        submitButtonLabel={submitButtonLabel}
    >
        {modalMessage}
    </Modal>
}

export default ConfirmationModal;