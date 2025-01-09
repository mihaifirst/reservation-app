import Modal from "../modal/modal.component";
import React, {useEffect, useState} from "react";

const modalDefaultFormFields = {
    title: ''
};

const CategoryFormModal = ({isOpen, onClose, onSubmit}) => {
    const modalTitleLabel = `Creaza categorie`;
    const submitButtonLabel = 'Creeaza categorie';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formFields, setFormFields] = useState(
        modalDefaultFormFields
    );

    useEffect(() => {
        if (isOpen) {
            setIsModalOpen(true);
        }
    }, [isOpen]);

    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
        setFormFields(modalDefaultFormFields);
    };

    const onCloseHandler = () => {
        closeModal();
    }

    const onSubmitHandler = () => {
          if (!formFields.title) {
            alert("Please enter a category title.");
            return;
          }

        onSubmit(formFields);
        closeModal();
    }

    const onFormFieldValueChange = (event) => {
        const {value, name} = event.target;
        setFormFields((fields) =>
            ({...fields, [name]: value})
        );
    };

    return   <Modal
        isOpen={isModalOpen}
        onClose={onCloseHandler}
        onSubmit={onSubmitHandler}
        submitButtonLabel={submitButtonLabel}
        modalTitleLabel={modalTitleLabel}
    >
        <form className="formular">
            <div className="formDiv">
                <label htmlFor="title" className="formLabel">
                    Titlu
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formFields.title}
                    onChange={onFormFieldValueChange}
                    placeholder="Introdu titlu categorie"
                />
            </div>
        </form>
    </Modal>
}

export default CategoryFormModal;