export default function isSlotOccupied(
  reservations,
  reservationId,
  categoryId,
  fieldId,
  time
) {
  const reservation = reservations.find(
    (reservation) => reservation.id === reservationId
  );
  if (!reservation) {
    return;
  }

  const category = reservation.categories.find(
    (category) => category.id === categoryId
  );
  if (!category) {
    return;
  }

  const field = category.fields.find((field) => field.id === fieldId);
  if (!field) {
    return;
  }

  const slot = field.occupiedSlots.find((slot) => slot.startTime === time);

  if (!slot) {
    return false;
  }

  return slot.startTime === time;
}

export const createField = (reservations, reservationId, categoryId) => {
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
  const category = result[reservationIndex].categories[categoryIndex];
  const fieldId = category.fields.length + 1;

  category.fields.push({
    id: fieldId,
    occupiedSlots: [],
  });

  return result;
};

export const deleteFieldFn = (
  reservations,
  reservationId,
  categoryId,
  fieldId
) => {
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

  const category = result[reservationIndex].categories[categoryIndex];

  const fieldIndex = category.fields.findIndex((field) => field.id === fieldId);
  if (fieldIndex === -1) {
    return;
  }
  category.fields.splice(fieldIndex, 1);

  if (category.fields.length === 0) {
    result[reservationIndex].categories.splice(categoryIndex, 1);
  }

  return result;
};
