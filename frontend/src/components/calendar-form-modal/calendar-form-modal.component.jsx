import Modal from "../modal/modal.component";
import formatDate from "../../helpers/calendar.helpers";
import React, {useEffect, useState} from "react";

const modalDefaultFormFields = {
    date: null,
    startHour: 12,
    endHour: 18,
    hourRange: 60,
};

const CalendarFormModal = ({isOpen, onClose, selectedDate, onSubmit}) => {
    const modalTitleLabel = selectedDate && `Creaza tabel pentru data: ${formatDate(selectedDate)}`;
    const submitButtonLabel = 'Creeaza calendar';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formFields, setFormFields] = useState(
        modalDefaultFormFields
    );

    useEffect(() => {
        if (selectedDate) {
            setFormFields((fields) =>
                ({...fields, date: formatDate(selectedDate)})
            );
        }
    }, [selectedDate])

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
        onSubmit(formFields);
        closeModal();
    }

    const onFormFieldValueChange = (event) => {
        const {value, name} = event.target;
        setFormFields((fields) =>
            ({...fields, date: formatDate(selectedDate), [name]: Number(value)})
        );
    };

    return <Modal
        isOpen={isModalOpen}
        onClose={onCloseHandler}
        onSubmit={onSubmitHandler}
        titleLabel={modalTitleLabel}
        submitButtonLabel={submitButtonLabel}>
        <form className="formular">
            <div className="formDiv">
                <label htmlFor="startHour" className="formLable">
                    StartHour
                </label>

                <input
                    type="number"
                    value={formFields.startHour}
                    name="startHour"
                    min="6"
                    max="12"
                    onChange={onFormFieldValueChange}
                    className="formInput"
                />
            </div>
            <div className="formDiv">
                <label className="formLable">EndHour</label>
                <input
                    type="number"
                    value={formFields.endHour}
                    min="18"
                    max="24"
                    name="endHour"
                    onChange={onFormFieldValueChange}
                    className="formInput"
                />
            </div>
            <label className="formDiv">
                Hour Range:
                <div>
                    <input
                        type="radio"
                        id="hour30"
                        name="hourRange"
                        value="30"
                        checked={formFields.hourRange === 30}
                        onChange={onFormFieldValueChange}
                    />
                    <label htmlFor="hour30">30</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="hour60"
                        name="hourRange"
                        value="60"
                        checked={formFields.hourRange === 60}
                        onChange={onFormFieldValueChange}
                    />
                    <label htmlFor="hour30">60</label>
                </div>
            </label>
        </form>
    </Modal>
}

export default CalendarFormModal;