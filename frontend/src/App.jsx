import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import setTimeSlots from "./setTimeSlots.js";
import getReservation from "./getReservation.js";
import abbreviation from "./abbreviation.js";
import isSlotOccupied from "./fieldsHelpers.js";

function App() {
  const [reservations, setReservations] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3333/api/structure")
      .then(({ data }) => {
        setReservations(data.reservations);
      })
      .catch((e) => console.log(e));
  }, []);

  const reservation = getReservation(reservations, "12/11/2024");

  if (!reservation.categories) {
    return;
  }

  const { startHour, endHour, range } = reservation;
  const timeSlots = setTimeSlots(startHour, endHour, range);

  return (
    <>
      <table className="table" border={1}>
        <thead>
          <tr>
            <td rowSpan={3}>Ora</td>
            {reservation.categories.map((category, index) => (
              <td key={index} colSpan={category.fields.length}>
                {category.title}
              </td>
            ))}
          </tr>
          <tr>
            {reservation.categories.map((item, index) =>
              item.fields.map((field, fieldIndex) => (
                <td key={fieldIndex} rowSpan={2}>
                  {field.id}. {abbreviation(item.title)}
                </td>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, index) => (
            <tr>
              <td key={index}>{time}</td>
              {reservation.categories.map((category, index) =>
                category.fields.map((field, fieldIndex) => (
                  <td
                    key={fieldIndex}
                    className={
                      isSlotOccupied(
                        reservations,
                        reservation.id,
                        category.id,
                        field.id,
                        time
                      )
                        ? "slot-closed"
                        : "slot-open"
                    }
                  >
                    {isSlotOccupied(
                      reservations,
                      reservation.id,
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
    </>
  );
}

export default App;
