import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import mapTimeSlots from "./helpers/mapTimeSlots.js";
import {abbreviation, createCalendar, getCalendar,} from "./helpers/reservations.js";
import isSlotOccupied from "./helpers/fieldsHelpers.js";
import DatePickerComponent from "./components/date-picker/date-picker.component.jsx";
import formatDate from "./helpers/calendar.helpers.js";
import CalendarFormModal from "./components/calendar-form-modal/calendar-form-modal.component";

const API_URL = "http://localhost:3333/api/structure";

function App() {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarFormModalOpen, setIsCalendarFormModalOpen] = useState(false);
  // TODO

  // const [newCategoryTitle, setNewCategoryTitle] = useState("");
  // const [nextCategoryId, setNextCategoryId] = useState(1);

  const getCalendarsFromApi = () => {
    axios
        .get(API_URL)
        .then(({ data }) => {
          setCalendars(data.calendars);
        })
        .catch((e) => console.log(e));
  }

  useEffect(() => {
    getCalendarsFromApi();
  }, []);

  useEffect(() => {
    if (!selectedCalendar) {
      return;
    }

    const { startHour, endHour, hourRange } = selectedCalendar;
    const timeSlots = mapTimeSlots(startHour, endHour, hourRange);
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

  const onCreateReservationClick = () => {
    setIsCalendarFormModalOpen(true);
  }

  const onCloseCalendarFormModal = () => {
    setIsCalendarFormModalOpen(false);
  }

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

  // TODO
  // const newCategoryTitleFn = (event) => {
  //   setNewCategoryTitle(event.target.value);
  // };

  // TODO
  // const handleAddCategory = () => {
  //   if (!newCategoryTitle) {
  //     alert("Please enter a category title.");
  //     return;
  //   }
  //
  //   const updatedCalendar = {
  //     ...selectedCalendar,
  //     categories: [
  //       ...selectedCalendar.categories,
  //       { id: nextCategoryId, title: newCategoryTitle, fields: [] },
  //     ],
  //   };
  //
  //   setSelectedCalendar(updatedCalendar);
  //   setNextCategoryId(nextCategoryId + 1);
  //   setNewCategoryTitle("");
  // };

  return (
    <Fragment>
      <div className="container">
        <DatePickerComponent
          onChangeDate={handleDateChange}
          className="datepicker"
        />
        {!selectedCalendar && (
          <div>
            <button onClick={onCreateReservationClick} className="createReservation">
              Creeaza calendar
            </button>
            <CalendarFormModal
              isOpen={isCalendarFormModalOpen}
              onClose={onCloseCalendarFormModal}
              onSubmit={onSubmitCalendarFormModal}
              selectedDate={selectedDate}
            >
            </CalendarFormModal>
          </div>
        )}

        {/*TODO*/}
        {/*{selectedCalendar && (*/}
        {/*  <div>*/}
        {/*    <button onClick={openModal} className="createReservation">*/}
        {/*      Create category*/}
        {/*    </button>*/}
        {/*    <Modal*/}
        {/*      isOpen={isModalOpen}*/}
        {/*      isClosed={closeModal}*/}
        {/*      onSubmit={handleAddCategory}*/}
        {/*      submitButtonLabel="Add Category"*/}
        {/*    >*/}
        {/*      <form className="formular">*/}
        {/*        <div className="formDiv">*/}
        {/*          <label htmlFor="newCategoryTitle" className="formLabel">*/}
        {/*            Category Title*/}
        {/*          </label>*/}
        {/*          <input*/}
        {/*            className={classes}*/}
        {/*            type="text"*/}
        {/*            id="newCategoryTitle"*/}
        {/*            value={newCategoryTitle}*/}
        {/*            onChange={newCategoryTitleFn}*/}
        {/*            placeholder="Enter category title"*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      </form>*/}
        {/*    </Modal>*/}
        {/*  </div>*/}
        {/*)}*/}

        {selectedCalendar && timeSlots && (
          <table className="table" border={1}>
            <thead>
              <tr>
                <td rowSpan={3}>Ora</td>
                {selectedCalendar.categories.map((category) => (
                  <td key={category.id} colSpan={category.fields.length}>
                    {category.title}
                  </td>
                ))}
              </tr>
              <tr>
                {selectedCalendar.categories.map((category) =>
                  category.fields.map((field) => (
                    <td key={field.id} rowSpan={2}>
                      {field.id}. {abbreviation(category.title)}
                    </td>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time) => (
                <tr key={time}>
                  <td>{time}</td>
                  {selectedCalendar.categories.map((category) =>
                    category.fields.map((field) => (
                      <td
                        key={`${category.id}-${field.id}`}
                        className={
                          isSlotOccupied(
                            calendars,
                            selectedCalendar.id,
                            category.id,
                            field.id,
                            time
                          )
                            ? "slot-closed"
                            : "slot-open"
                        }
                      >
                        {isSlotOccupied(
                          calendars,
                          selectedCalendar.id,
                          category.id,
                          field.id,
                          time
                        )
                          ? "Closed"
                          : "Open"}
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Fragment>
  );
}

export default App;
