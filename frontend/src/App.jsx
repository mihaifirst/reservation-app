import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import setTimeSlots from "./helpers/setTimeSlots.js";
import { getReservation, abbreviation } from "./helpers/reservations.js";
import isSlotOccupied from "./helpers/fieldsHelpers.js";

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

  if (!reservation?.categories) {
    return null;
  }

  const { startHour, endHour, range } = reservation;
  const timeSlots = setTimeSlots(startHour, endHour, range);

  return (
    <>
      <table className="table" border={1}>
        <thead>
          <tr>
            <td rowSpan={3}>Ora</td>
            {reservation.categories.map((category) => (
              <td key={category.id} colSpan={category.fields.length}>
                {category.title}
              </td>
            ))}
          </tr>
          <tr>
            {reservation.categories.map((category) =>
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
              {reservation.categories.map((category) =>
                category.fields.map((field) => (
                  <td
                    key={`${category.id}-${field.id}`}
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
