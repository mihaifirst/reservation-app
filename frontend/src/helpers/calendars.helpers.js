export const getCalendar = (calendars, date) => {
  const result = [...calendars];
  if (!calendars) {
    return [];
  }
  const calendar = result.find((item) => item.date === date);
  return calendar;
};

export const abbreviation = (name) => {
  let nameArr = name.split(" ");
  if (nameArr.length === 1) {
    return name;
  } else {
    return nameArr[0][0] + ". " + nameArr[nameArr.length - 1];
  }
};

export const createCalendar = (
  calendars,
  date,
  startHour,
  endHour,
  hourRange
) => {
  const id = calendars.length + 1;
  const newcalendar = {
    id,
    date,
    startHour,
    endHour,
    hourRange,
    categories: [],
  };

  return [...calendars, newcalendar];
};

export const deleteCalendar = (calendars, calendarId) => {
  const result = [...calendars];
  const calendarIndex = result.findIndex(
    (calendar) => calendar.id === calendarId
  );

  if (calendarIndex === -1) {
    return;
  }

  result.splice(calendarIndex, 1);

  return result;
};
