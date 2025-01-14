import { createField } from "./fields.helpers";

export const createCategoryFn = (reservations, reservationId, title) => {
  let state = [...reservations];

  const reservationIndex = state.findIndex(
    (reservation) => reservation.id === reservationId
  );
  if (reservationIndex === -1) {
    return state;
  }

  const categoryId = state[reservationIndex].categories.length + 1;

  state[reservationIndex].categories.push({
    id: categoryId,
    title: title,
    fields: [],
  });

  state = createField(state, reservationId, categoryId);

  return state;
};

export const deleteCategoryFn = (reservations, reservationId, categoryId) => {
  const result = [...reservations];

  const reservationIndex = result.findIndex(
    (reservation) => reservation.id === reservationId
  );
  if (reservationIndex === -1) {
    return;
  }

  const categoryIndex = result[reservationIndex].categories.findIndex(
    (category) => category.id === categoryId
  );
  if (categoryIndex === -1) {
    return;
  }

  result[reservationIndex].categories.splice(categoryIndex, 1);

  return result;
};
