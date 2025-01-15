import { createField } from "./fields.helpers";

export const createCategoryFn = (calendars, calendarId, title) => {
  let state = [...calendars];

  const calendarIndex = state.findIndex(
    (calendar) => calendar.id === calendarId
  );
  if (calendarIndex === -1) {
    return state;
  }

  const categoryId = state[calendarIndex].categories.length + 1;

  state[calendarIndex].categories.push({
    id: categoryId,
    title: title,
    fields: [],
  });

  state = createField(state, calendarId, categoryId);

  return state;
};

export const deleteCategoryFn = (calendars, calendarId, categoryId) => {
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

  result[calendarIndex].categories.splice(categoryIndex, 1);

  return result;
};
