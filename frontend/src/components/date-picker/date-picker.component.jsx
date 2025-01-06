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
      <h2>Select a date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={dateChange}
        dateFormat="MM/dd/yyyy"
      />
      {selectedDate && (
        <p className={style.datePicker}>
          Selected date: {selectedDate.toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default DatePickerComponent;
