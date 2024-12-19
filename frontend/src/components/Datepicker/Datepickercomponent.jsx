import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatepickerComponent = ({ onChangeDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dateChange = (event) => {
    console.log(event);
    setSelectedDate(event);
    onChangeDate(event);
  };

  useEffect(() => {
    console.log(onChangeDate(selectedDate));
  }, []);

  return (
    <div>
      <h2>Select a date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={dateChange}
        dateFormat="MM/dd/yyyy"
      />
      {selectedDate && (
        <p>Selected date: {selectedDate.toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default DatepickerComponent;
