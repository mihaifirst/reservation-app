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
