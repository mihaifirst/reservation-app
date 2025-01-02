import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import mapTimeSlots from "./helpers/mapTimeSlots.js";
import { getReservation, abbreviation } from "./helpers/reservations.js";
import isSlotOccupied from "./helpers/fieldsHelpers.js";
import DatePickerComponent from "./components/date-picker/date-picker.component.jsx";
import formatDate from "./helpers/calendar.helpers.js";
import Modal from "./components/new-table-modal/new-table-modal.component.jsx";

function App() {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // console.log("useEffect -> axios");

    axios
      .get("http://localhost:3333/api/structure")
      .then(({ data }) => {
        setCalendars(data.calendars);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    // console.log("useEffect -> selectedCalendar", selectedCalendar);
    if (!selectedCalendar) {
      return;
    }

    const timeSlots = mapTimeSlots(
      selectedCalendar.startHour,
      selectedCalendar.endHour,
      selectedCalendar.range
    );
    setTimeSlots(timeSlots);
  }, [selectedCalendar]);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    const formatedDate = formatDate(selectedDate);
    // console.log("useEffect -> formatedDate, calendars", {
    //   formatedDate,
    // });

    const calendar = getReservation(calendars, formatedDate);

    setSelectedCalendar(calendar);
  }, [calendars, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
            <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <h2>Modal Title</h2>
              <p>This is the modal content!</p>
            </Modal>
          </div>
        )}

        {selectedCalendar &&
          selectedCalendar.categories &&
          timeSlots &&
          timeSlots.length && (
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
