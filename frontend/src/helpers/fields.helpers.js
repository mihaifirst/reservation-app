export default function isSlotOccupied(
  calendars,
  calendarId,
  categoryId,
  fieldId,
  time
) {
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

  const fieldIndex = result[calendarIndex].categories[
    categoryIndex
  ].fields.findIndex((field) => field.id === fieldId);
  if (fieldIndex === -1) {
    return;
  }

  const slot = result[calendarIndex].categories[categoryIndex].fields[
    fieldIndex
  ].occupiedSlots.find((slot) => slot.startTime === time);

  if (!slot) {
    return false;
  }

  return slot.startTime === time;
}

export const createField = (calendars, calendarId, categoryId) => {
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

  const fieldId = category.fields.length + 1;
  category.fields.push({
    id: fieldId,
    occupiedSlots: [],
  });
  return result;
};

export const deleteFieldFn = (calendars, calendarId, categoryId, fieldId) => {
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
  category.fields.splice(fieldIndex, 1);

  if (category.fields.length === 0) {
    result[calendarIndex].categories.splice(categoryIndex, 1);
  }

  return result;
};
