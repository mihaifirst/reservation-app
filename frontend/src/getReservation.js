export default function getReservation(reservations, date) {
  if (!reservations) {
    return [];
  }
  const reservation =
    reservations.find((item) => item.date === date) || "no reservation";
  return reservation;
}
