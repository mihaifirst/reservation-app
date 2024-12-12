export default function getCategories(reservations, date) {
  if (!reservations) {
    return [];
  }
  let reservation =
    reservations.find((item) => item.date === date) || "no reservation";
  let titles = reservation.categories.map((item) => item.title);
  return titles;
}
