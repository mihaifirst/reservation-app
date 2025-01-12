export const createCategoryFn = (reservations, reservationId, title) => {
    const state = [...reservations];

    const reservationIndex = state
        .findIndex(reservation => reservation.id === reservationId);

    if (reservationIndex === -1) {
        return state;
    }

    state[reservationIndex].categories.push({
        id: state[reservationIndex].categories.length + 1,
        title: title,
        fields: [],
    });

    return state;
}