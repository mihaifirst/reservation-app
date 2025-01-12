export const getCalendar = (reservations, date) => {
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

export const createCalendar = (
  reservations,
  date,
  startHour,
  endHour,
  hourRange
) => {
  const id = reservations.length + 1;
  const newReservation = {
    id,
    date,
    startHour,
    endHour,
    hourRange,
    categories: [],
  };

  return [...reservations, newReservation];
};

export const deleteReservation = (reservations, reservationId) => {
  const result = [...reservations];
  const reservationIndex = result.findIndex(
    (reservation) => reservation.id === reservationId
  );

  if (reservationIndex === -1) {
    return;
  }

  result.splice(reservationIndex, 1);

  return result;
};
