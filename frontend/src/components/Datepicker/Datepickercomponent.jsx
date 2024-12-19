import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatepickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <h2>Selectează o dată:</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Pick a date"
      />
      {selectedDate && (
        <p>Selected date: {selectedDate.toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default DatepickerComponent;
