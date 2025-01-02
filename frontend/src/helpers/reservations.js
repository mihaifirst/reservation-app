export const getReservation = (reservations, date) => {
  if (!reservations) {
    return [];
  }
  const reservation = reservations.find((item) => item.date === date);
  return reservation;
};

export const abbreviation = (name) => {
  let nameArr = name.split(" ");
  if (nameArr.length === 1) {
    return name;
  } else {
    return nameArr[0][0] + ". " + nameArr[nameArr.length - 1];
  }
};
