import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ onChangeDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dateChange = (event) => {
    setSelectedDate(event);
    onChangeDate(event);
  };

  useEffect(() => {
    // console.log('DatePickerComponent -> useEffect -> selectedDate', selectedDate);
    onChangeDate(selectedDate);
  }, [selectedDate]);

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

export default DatePickerComponent;
