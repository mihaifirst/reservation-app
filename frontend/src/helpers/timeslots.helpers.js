export const timeSlotsHelpers = (hour, end, range) => {
  if (!range) {
    return [];
  }
  const result = [];
  let minutes = 0;
  for (let i = hour; i <= end; i++) {
    const fullHour = `${doubleDigits(i)}:${doubleDigits(minutes)}`;
    if (i === end && minutes === 30) {
      continue;
    }
    if (minutes === 60) {
      minutes = 0;
      continue;
    }
    result.push(fullHour);
    minutes += range;
    i--;
  }
  return result;
};

function doubleDigits(input) {
  if (input < 10) {
    return "0" + input;
  }
  return input;
}

export const occupySlotFn = (
  calendars,
  calendarId,
  categoryId,
  fieldId,
  time
) => {
  const result = [...calendars];

  const calendarIndex = result.findIndex(
    (calendar) => calendar.id === calendarId
  );

  if (calendarIndex === -1) {
    return;
  }
  const categoryIndex = result[calendarIndex].categories.findIndex(
    (category) => category.id === categoryId
  );

  if (categoryIndex === -1) {
    return;
  }

  const category = result[calendarIndex].categories[categoryIndex];
  const fieldIndex = category.fields.findIndex((field) => field.id === fieldId);

  if (fieldIndex === -1) {
    return;
  }

  const slotIndex = category.fields[fieldIndex].occupiedSlots.findIndex(
    (slot) => slot.startTime === time
  );

  if (slotIndex > -1) {
    category.fields[fieldIndex].occupiedSlots.splice(slotIndex, 1);
  } else {
    category.fields[fieldIndex].occupiedSlots.push({
      startTime: time,
      duration: 30,
    });
  }

  return result;
};
