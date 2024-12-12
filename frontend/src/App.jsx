import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import setTimeSlots from "./setTimeSlots";
import getCategories from "./getCategories";

function App() {
  // const [reservations, setReservation] = useState(null);
  // const start = 23;
  // const end = 24;
  // const range = 30;
  // const timeSlots = setTimeSlots(start, end, range);
  // const names = ["Fotbal", "Tenis", "Tenis de picior"];

  console.log("1");

  // const getReservations = () => {
  //   axios
  //     .get("http://localhost:3333/api/structure")
  //     .then(({ data }) => {
  //       // console.log(data);
  //       // console.log("2");
  //       setReservation(data.reservations);
  //       // console.log(getCategories(reservations, "28/10/2024"));
  //     })
  //     .catch((e) => console.log(e));
  // };

  useEffect(() => {
    // getReservations();
    console.log("2");
  }, []);

  console.log("3");

  return (
    <>
      {/* <pre>{JSON.stringify(data.reservations, null, 2)}</pre> */}
      <table className="table" border={1}>
        <thead>
          <tr>
            <td rowSpan={3}>Ora</td>

            {names.map((name, index) => (
              <td key={index} colSpan={names.length}>
                {name}
              </td>
            ))}
          </tr>
          <tr>
            <td rowSpan={2}>1. Fotbal</td>
            <td rowSpan={2}>2. Fotbal</td>
            <td rowSpan={2}>3. Fotbal</td>
            <td rowSpan={2}>4. Tenis</td>
            <td rowSpan={2}>5. Tenis</td>
            <td rowSpan={2}>6. Tenis</td>
            <td rowSpan={2}>7. Tenis</td>
            <td rowSpan={2}>8. Tenis</td>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>08:00</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>08:30</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr> */}

          {timeSlots.map((name, index) => (
            <tr>
              <td key={index}>{name}</td>
              <td>1</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
