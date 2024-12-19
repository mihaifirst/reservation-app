import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import setTimeSlots from "./helpers/setTimeSlots.js";
import { getcalendar, abbreviation } from "./helpers/calendars.js";
import isSlotOccupied from "./helpers/fieldsHelpers.js";
import DatepickerComponent from "./components/Datepicker/Datepickercomponent.jsx";

function App() {
  const [calendars, setCalendars] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3333/api/structure")
      .then(({ data }) => {
        setCalendars(data.calendars);
      })
      .catch((e) => console.log(e));
  }, []);

  const calendar = getcalendar(calendars, "12/11/2024");

  if (!calendar?.categories) {
    return null;
  }

  const { startHour, endHour, range } = calendar;
  const timeSlots = setTimeSlots(startHour, endHour, range);

  return (
    <>
      <div className="container">
        <DatepickerComponent />
        <table className="table" border={1}>
          <thead>
            <tr>
              <td rowSpan={3}>Ora</td>
              {calendar.categories.map((category) => (
                <td key={category.id} colSpan={category.fields.length}>
                  {category.title}
                </td>
              ))}
            </tr>
            <tr>
              {calendar.categories.map((category) =>
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
                {calendar.categories.map((category) =>
                  category.fields.map((field) => (
                    <td
                      key={`${category.id}-${field.id}`}
                      className={
                        isSlotOccupied(
                          calendars,
                          calendar.id,
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
                        calendar.id,
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
      </div>
    </>
  );
}

export default App;
