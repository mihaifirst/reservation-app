import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { computeTimeSlots } from "./hours";
import { computeCategoriesTitle } from "./fields";

const App = () => {
  const [selectedDate, setSelectedDate] = useState("2024-11-01");
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState({});
  const [fields, setFields] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const handleChange = useCallback(
    (e) =>
      setSelectedDate((prev) => {
        return e.target.value;
      }),
    []
  );

  useEffect(() => {
    findReservation();
  }, [selectedDate]);

  useEffect(() => {
    findReservation();
  }, [reservations]);

  useEffect(() => {
    if (!reservation) {
      setTimeSlots([]);
      setFields([]);
      return;
    }
    const { startHour, endHour, range } = reservation;
    const timeSlots = computeTimeSlots(startHour, endHour, range);
    setTimeSlots(timeSlots);
    const fields = computeCategoriesTitle(reservation.categories);
    setFields(fields);
  }, [reservation]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/api/structure")
      .then(({ data }) => {
        setReservations(data.reservations);
      })
      .catch((error) => console.log(error));
  }, []);

  function findReservation() {
    const result = reservations.find((r) => {
      return r.date === selectedDate;
    });
    setReservation(result);
  }

  return (
    <>
      <input type="date" value={selectedDate} onChange={handleChange} />
      {/* <pre>
        <code>{JSON.stringify(reservation, null, 2)}</code>
      </pre> */}

      <div className="table">
        <table border="1">
          <thead>
            <tr>
              <th></th>
              {reservation?.categories?.map((category, index) => {
                return (
                  <th key={index} colSpan={category?.fields?.length}>
                    {category?.title}
                  </th>
                );
              })}
            </tr>
            <tr>
              <th rowSpan={2}>Ora</th>
              {fields?.map((field, index) => {
                return <th key={index}>{field}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot, index) => (
              <tr key={index}>
                <td>{timeSlot}</td>
                {fields?.map((field, index) => {
                  return <td key={index}></td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
