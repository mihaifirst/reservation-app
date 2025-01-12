import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import timeslotsHelpers from "./helpers/timeslots.helpers.js";
import {createCalendar, deleteReservation, getCalendar,} from "./helpers/reservations.helpers.js";
import DatePickerComponent from "./components/date-picker/date-picker.component.jsx";
import formatDate from "./helpers/calendar.helpers.js";
import CalendarFormModal from "./components/calendar-form-modal/calendar-form-modal.component";
import CategoryFormModal from "./components/category-form-modal/category-form-modal.component";
import CalendarTable from "./components/calendar-table/calendar-table.component.jsx";
import {createField, deleteFieldFn} from "./helpers/fields.helpers.js";
import {createCategoryFn} from "./helpers/category.helpers";
import ConfirmationModal from "./components/confirmation-modal/confirmation-modal.component";

const API_URL = "http://localhost:3333/api/structure";

const confirmationModalStateDefault = {
    isOpen: false,
    submitButtonLabel: '',
    modalTitleLabel: '',
    modalMessage: '',
    context: '',
}

const CONFIRMATION_MODAL_CONTEXT = {
    DELETE_TABLE : 'DELETE_TABLE',
    DELETE_CATEGORY: 'DELETE_CATEGORY'
}

function App() {
    const [calendars, setCalendars] = useState([]);
    const [selectedCalendar, setSelectedCalendar] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isCalendarFormModalOpen, setIsCalendarFormModalOpen] = useState(false);
    const [isCategoryFormModalOpen, setIsCategoryFormModalOpen] = useState(false);
    const [confirmationModalState, setConfirmationModalState] = useState(confirmationModalStateDefault)

    const getCalendarsFromApi = () => {
        axios
            .get(API_URL)
            .then(({data}) => {
                setCalendars(data.calendars);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        getCalendarsFromApi();
    }, []);

    useEffect(() => {
        if (!selectedCalendar) {
            return;
        }

        const {startHour, endHour, hourRange} = selectedCalendar;
        const timeSlots = timeslotsHelpers(startHour, endHour, hourRange);
        setTimeSlots(timeSlots);
    }, [selectedCalendar, calendars]);

    useEffect(() => {
        if (!selectedDate) {
            return;
        }

        const formattedDate = formatDate(selectedDate);
        const calendar = getCalendar(calendars, formattedDate);
        setSelectedCalendar(calendar);
    }, [calendars, selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const deleteCalendar = () => {
        buildConfirmationModal(
            CONFIRMATION_MODAL_CONTEXT.DELETE_TABLE,
            'Sterge tabel',
            'Esti sigur ca vrei sa stergi tabelul?',
            'Sterge');
    };

    /* Reservations methods */
    const onCreateReservationClick = () => {
        setIsCalendarFormModalOpen(true);
    };

    const onCloseCalendarFormModal = () => {
        setIsCalendarFormModalOpen(false);
    };

    const onSubmitCalendarFormModal = (formFields) => {
        const {date, startHour, endHour, hourRange} = formFields;

        const newReservations = createCalendar(
            calendars,
            date,
            startHour,
            endHour,
            hourRange
        );
        setCalendars(newReservations);
    };

    /* Category methods */
    const onCreateCategoryClick = () => {
        setIsCategoryFormModalOpen(true);
    };

    const onCloseCategoryFormModal = () => {
        setIsCategoryFormModalOpen(false);
    };

    const onSubmitCategoryFormModal = (formFields) => {
        const {title} = formFields;

        const updatedCalendars = createCategoryFn(calendars, selectedCalendar.id, title);
        setCalendars(updatedCalendars);
    };

    const addField = (categoryId) => {
        const updatedCalendars = createField(
            calendars,
            selectedCalendar.id,
            categoryId
        );

        setCalendars(updatedCalendars);
    };

    const deleteField = (categoryId, fieldId) => {
        const updatedCalendars = deleteFieldFn(
            calendars,
            selectedCalendar.id,
            categoryId,
            fieldId
        );
        setCalendars(updatedCalendars);
    };

    /* Confirmation modal methods */
    const onOpenConfirmationModal = () => {
        setConfirmationModalState(
            {
                isOpen: true
            }
        );
    };

    const onCloseConfirmationModal = () => {
        setConfirmationModalState(
            {
                isOpen: false
            }
        );
    };

    const onSubmitConfirmationModal = () => {
        switch (confirmationModalState.context) {
            case CONFIRMATION_MODAL_CONTEXT.DELETE_TABLE:
                const updatedCalendars = deleteReservation(calendars, selectedCalendar.id);
                setCalendars(updatedCalendars);
                setTimeSlots([]);
                break;
        }
    }

    const buildConfirmationModal = (context, modalTitleLabel, modalMessage, submitButtonLabel) => {
        setConfirmationModalState({
            context,
            modalTitleLabel,
            modalMessage,
            submitButtonLabel,
            isOpen: true,
        });
    }

    return (
        <Fragment>
            <ConfirmationModal
                isOpen={confirmationModalState.isOpen}
                modalTitleLabel={confirmationModalState.modalTitleLabel}
                modalMessage={confirmationModalState.modalMessage}
                submitButtonLabel={confirmationModalState.submitButtonLabel}
                onClose={onCloseConfirmationModal}
                onSubmit={onSubmitConfirmationModal}
            />
            <div className="container">
                <DatePickerComponent
                    onChangeDate={handleDateChange}
                    className="datepicker"
                />
                {!selectedCalendar && (
                    <div>
                        <button
                            onClick={onCreateReservationClick}
                            className="createReservation"
                        >
                            Creeaza calendar
                        </button>
                        <CalendarFormModal
                            isOpen={isCalendarFormModalOpen}
                            onClose={onCloseCalendarFormModal}
                            onSubmit={onSubmitCalendarFormModal}
                            selectedDate={selectedDate}
                        ></CalendarFormModal>
                    </div>
                )}

                {selectedCalendar && (
                    <Fragment>
                        <div>
                            <button
                                onClick={onCreateCategoryClick}
                                className="createReservation"
                            >
                                Creeaza categorie
                            </button>
                            <button onClick={deleteCalendar} className="createReservation">
                                Sterge tabel
                            </button>

                            <CategoryFormModal
                                isOpen={isCategoryFormModalOpen}
                                onClose={onCloseCategoryFormModal}
                                onSubmit={onSubmitCategoryFormModal}
                            ></CategoryFormModal>
                        </div>

                        {timeSlots && (
                            <CalendarTable
                                timeSlots={timeSlots}
                                selectedCalendar={selectedCalendar}
                                calendars={calendars}
                                addField={addField}
                                deleteField={deleteField}
                            />
                        )}
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
}

export default App;
