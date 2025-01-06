import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./date-picker.module.css";

const DatePickerComponent = ({ onChangeDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dateChange = (event) => {
    setSelectedDate(event);
    onChangeDate(event);
  };

  useEffect(() => {
    onChangeDate(selectedDate);
  }, [selectedDate, onChangeDate]);

  return (
    <div>
      <h1>Select a date</h1>
      {selectedDate && (
        <p className={style.datePicker}>
          Selected date: {selectedDate.toLocaleDateString()}
        </p>
      )}
      <DatePicker
        selected={selectedDate}
        onChange={dateChange}
        dateFormat="MM/dd/yyyy"
      />
    </div>
  );
};

export default DatePickerComponent;
