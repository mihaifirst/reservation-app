import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import timeslotsHelpers from "./helpers/timeslots.helpers.js";
import {
  createCalendar,
  getCalendar,
  deleteReservation,
} from "./helpers/reservations.helpers.js";
import DatePickerComponent from "./components/date-picker/date-picker.component.jsx";
import formatDate from "./helpers/calendar.helpers.js";
import CalendarFormModal from "./components/calendar-form-modal/calendar-form-modal.component";
import CategoryFormModal from "./components/category-form-modal/category-form-modal.component";
import CalendarTable from "./components/calendar-table/calendar-table.component.jsx";
import { createField, deleteFieldFn } from "./helpers/fields.helpers.js";

const API_URL = "http://localhost:3333/api/structure";

function App() {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarFormModalOpen, setIsCalendarFormModalOpen] = useState(false);
  const [isCategoryFormModalOpen, setIsCategoryFormModalOpen] = useState(false);

  const getCalendarsFromApi = () => {
    axios
      .get(API_URL)
      .then(({ data }) => {
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

    const { startHour, endHour, hourRange } = selectedCalendar;
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
    const updatedCalendars = deleteReservation(calendars, selectedCalendar.id);
    setCalendars(updatedCalendars);
    setTimeSlots([]);
  };

  /* Reservations methods */
  const onCreateReservationClick = () => {
    setIsCalendarFormModalOpen(true);
  };

  const onCloseCalendarFormModal = () => {
    setIsCalendarFormModalOpen(false);
  };

  const onSubmitCalendarFormModal = (formFields) => {
    const { date, startHour, endHour, hourRange } = formFields;

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
    const { title } = formFields;

    const updatedCalendar = {
      ...selectedCalendar,
      categories: [
        ...selectedCalendar.categories,
        {
          id: selectedCalendar.categories.length + 1,
          title: title,
          fields: [],
        },
      ],
    };

    setSelectedCalendar(updatedCalendar);
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

  return (
    <Fragment>
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
