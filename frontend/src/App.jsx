import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import mapTimeSlots from "./helpers/mapTimeSlots.js";
import {
  getCalendar,
  abbreviation,
  createCalendar,
} from "./helpers/reservations.js";
import isSlotOccupied from "./helpers/fieldsHelpers.js";
import DatePickerComponent from "./components/date-picker/date-picker.component.jsx";
import formatDate from "./helpers/calendar.helpers.js";
import Modal from "./components/new-table-modal/modal.component.jsx";

const modalDefaultFormFields = {
  date: null,
  startHour: 12,
  endHour: 18,
  hourRange: 60,
};

function App() {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFormFields, setModalFormFields] = useState(
    modalDefaultFormFields
  );
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [nextCategoryId, setNextCategoryId] = useState(1);

  const classes = "formInput categoryInput";

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3333/api/structure")
      .then(({ data }) => {
        setCalendars(data.calendars);
      })
      .catch((e) => console.log(e));
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

    const formatedDate = formatDate(selectedDate);
    console.log(formatedDate);

    const calendar = getCalendar(calendars, formatedDate);

    setSelectedCalendar(calendar);
    setModalFormFields((fields) => ({
      ...fields,
      date: formatedDate,
    }));
  }, [calendars, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setModalFormFields({ ...modalFormFields, [name]: Number(value) });
  };

  const onSubmit = () => {
    const { date, startHour, endHour, hourRange } = modalFormFields;

    const newReservations = createCalendar(
      calendars,
      date,
      startHour,
      endHour,
      hourRange
    );
    console.log({ newReservations });

    setCalendars(newReservations);
    setIsModalOpen(false);
  };

  const handleAddCategory = () => {
    if (!newCategoryTitle) {
      alert("Please enter a category title.");
      return;
    }

    const updatedCalendar = {
      ...selectedCalendar,
      categories: [
        ...selectedCalendar.categories,
        { id: nextCategoryId, title: newCategoryTitle, fields: [] },
      ],
    };

    setSelectedCalendar(updatedCalendar);
    setNextCategoryId(nextCategoryId + 1);
    setNewCategoryTitle("");
    setIsModalOpen(false);
  };

  const newCategoryTitleFn = (event) => {
    setNewCategoryTitle(event.target.value);
  };

  return (
    <>
      <div className="container">
        <DatePickerComponent
          onChangeDate={handleDateChange}
          className="datepicker"
        />
        {!selectedCalendar && (
          <div>
            <button onClick={openModal} className="createReservation">
              Create Reservation
            </button>
            <Modal
              isOpen={isModalOpen}
              isClosed={closeModal}
              onSubmit={onSubmit}
              submitButtonLabel="Create Table"
            >
              <form className="formular">
                {selectedDate && (
                  <span className="createTable">
                    Creaza tabel pentru data: {formatDate(selectedDate)}
                  </span>
                )}
                <div className="formDiv">
                  <label htmlFor="startHour" className="formLable">
                    StartHour
                  </label>

                  <input
                    type="number"
                    value={modalFormFields.startHour}
                    name="startHour"
                    min="6"
                    max="12"
                    onChange={handleChange}
                    className="formInput"
                  />
                </div>
                <div className="formDiv">
                  <label className="formLable">EndHour</label>
                  <input
                    type="number"
                    value={modalFormFields.endHour}
                    min="18"
                    max="24"
                    name="endHour"
                    onChange={handleChange}
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
                      checked={modalFormFields.hourRange === 30}
                      onChange={handleChange}
                    />
                    <label htmlFor="hour30">30</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="hour60"
                      name="hourRange"
                      value="60"
                      checked={modalFormFields.hourRange === 60}
                      onChange={handleChange}
                    />
                    <label htmlFor="hour30">60</label>
                  </div>
                </label>
              </form>
            </Modal>
          </div>
        )}

        {selectedCalendar && (
          <div>
            <button onClick={openModal} className="createReservation">
              Create category
            </button>
            <Modal
              isOpen={isModalOpen}
              isClosed={closeModal}
              onSubmit={handleAddCategory}
              submitButtonLabel="Add Category"
            >
              <form className="formular">
                <div className="formDiv">
                  <label htmlFor="newCategoryTitle" className="formLabel">
                    Category Title
                  </label>
                  <input
                    className={classes}
                    type="text"
                    id="newCategoryTitle"
                    value={newCategoryTitle}
                    onChange={newCategoryTitleFn}
                    placeholder="Enter category title"
                  />
                </div>
              </form>
            </Modal>
          </div>
        )}

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
    </>
  );
}

export default App;
