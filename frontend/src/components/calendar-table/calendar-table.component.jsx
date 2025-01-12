import React from "react";
import isSlotOccupied from "../../helpers/fields.helpers.js";
import { abbreviation } from "../../helpers/reservations.helpers.js";
import style from "./calendar-table.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

const CalendarTable = ({
  timeSlots,
  selectedCalendar,
  calendars,
  addField,
  deleteField,
}) => {
  return (
    <table className="table" border={1}>
      <thead>
        <tr>
          <td rowSpan={3}>Ora</td>
          {selectedCalendar.categories.map((category) => (
            <td key={category.id} colSpan={category.fields.length}>
              <div className={style.calendarTD}>
                {category.title}
                <AddBoxIcon onClick={() => addField(category.id)} />
              </div>
            </td>
          ))}
        </tr>
        <tr>
          {selectedCalendar.categories.map((category) =>
            category.fields.map((field) => (
              <td key={field.id} rowSpan={2}>
                {field.id} {abbreviation(category.title)}
                <DeleteIcon
                  onClick={() => deleteField(category.id, field.id)}
                />
              </td>
            ))
          )}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((time) => (
          <tr key={time}>
            <td>{time}</td>
            {selectedCalendar.categories.map((category) =>
              category.fields.map((field) => (
                <td
                  key={`${category.id}-${field.id}`}
                  className={
                    isSlotOccupied(
                      calendars,
                      selectedCalendar.id,
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
                    selectedCalendar.id,
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
  );
};

export default CalendarTable;
